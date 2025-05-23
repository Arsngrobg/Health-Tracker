const userModel = require('../models/user');
var crypto = require('crypto');

const login = require('../json/login.json');
const signup = require('../json/signup.json');
const resetPassword = require('../json/reset-password.json');

exports.login = async (req, res) => {
    const identifier = req.body.identifier;
    const password = req.body.password;
    try {
        const user = await userModel.findUser(identifier);
        const hash = crypto.createHash('md5').update(password).digest('hex');
        if(!user) {
            return res.render('../src/views/pages/login', {
                login,
                errorMessage: "Invalid credentials: username or email not found"
            });
        }
        if(hash !== user.Password) {
            return res.render('../src/views/pages/login', {
                login,
                errorMessage: "Invalid credentials: password incorrect"
            });
        }
        req.session.user = user;
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
        res.render('../src/views/pages/login', {
            login,
            errorMessage: "Something went wrong, please try again"
        });
    }
};

exports.signup = async (req, res) => {
    const username = req.body.username;
    const forename = req.body.forename;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const foundUsername = await userModel.findUser(username);
        const foundEmail = await userModel.findUser(email);
        if(foundUsername || foundEmail) {
            return res.render('../src/views/pages/signup', {
                signup,
                errorMessage: "Invalid credentials: username or email already used"
            });
        }
        const hash = crypto.createHash('md5').update(password).digest('hex');
        await userModel.createUser(username, forename, surname, email, hash);
        res.redirect('/users/login');
    }
    catch (err) {
        console.log(err);
        res.render('../src/views/pages/signup', {
            signup,
            errorMessage: "Something went wrong, please try again"
        });
    }
};

// In a real system this would use a code from an email or a text
exports.resetPassword = async (req, res) => {
    const identifier = req.body.identifier;
    const newPassword = req.body.newPassword;
    const newPasswordConfirmation = req.body.newPasswordConfirmation;
    try {
        if(newPassword !== newPasswordConfirmation) {
            res.render('../src/views/pages/reset-password', {
                resetPassword,
                errorMessage: "Password does not match, please try again"
            });
        }
        else {
            const hash = crypto.createHash('md5').update(newPassword).digest('hex');
            await userModel.changePassword(identifier, hash);
            res.redirect('/users/login');
        }
    }
    catch (err) {
        console.log(err);
        res.render('../src/views/pages/reset-password', {
            resetPassword,
            errorMessage: "Something went wrong, please try again"
        });
    }
};

exports.updateUserProfile = async(req, res) => {
    const userID = res.locals.user.UserID;
    const username = req.body.username;
    const forename = req.body.forename;
    const surname = req.body.surname;
    const dob = req.body.dob;
    try {
        await userModel.updateUserProfile(userID, username, forename, surname, dob);
        req.session.user.Username = username;
        req.session.user.Forename = forename;
        req.session.user.Surname = surname;
        req.session.user.DOB = dob;
        res.redirect('/profile');
    }
    catch (err) {
        console.log(err);
    }
};

exports.updateUserAccount = async(req, res) => {
    const userID = res.locals.user.UserID;
    const username = req.body.username;
    const email = req.body.email;
    try {
        await userModel.updateUserAccount(userID, username, email);
        req.session.user.Username = username;
        req.session.user.Email = email;
        res.redirect('/settings/account');
    }
    catch (err) {
        console.log(err);
    }
};

exports.deleteUser = async(req, res) => {
    const userID = res.locals.user.UserID;
    try {
        await userModel.deleteUser(userID);
        res.redirect('/users/logout');
    }
    catch (err) {
        console.log(err);
    }
};

exports.clearHealth = async(req, res) => {
    const userID = res.locals.user.UserID;
    try {
        await userModel.clearHealth(userID);
        req.session.user.Height = '';
        req.session.user.Weight = '';
        res.redirect('/settings/privacy');
    }
    catch (err) {
        console.log(err);
    }
};

exports.updateUserHealth = async (req, res) => {
    const userID = res.locals.user.UserID;
    const height = req.body.height;
    const weight = req.body.weight;
    try {
        await userModel.updateUserHealth(userID, height, weight);
        req.session.user.Height = height;
        req.session.user.Weight = weight;
        res.redirect('/settings/privacy');
    }
    catch (err) {
        console.log(err);
    }
};