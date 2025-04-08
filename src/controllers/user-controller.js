const userModel = require('../models/user');
var crypto = require('crypto');

exports.login = async (req, res) => {
    const identifier = req.body.identifier;
    const password = req.body.password;
    try {
        const user = await userModel.findUser(identifier);
        const hash = crypto.createHash('md5').update(password).digest('hex');
        if(!user) {
            return res.send("Invalid credentials: username or email not found");
        }
        if(hash !== user.Password) {
            return res.send("Invalid credentials: password incorrect");
        }
        res.send("Login successful");
    }
    catch (err) {
        console.log(err);
        res.send("Something went wrong, please try again");
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
            return res.send("Username or email is already being used");
        }
        const hash = crypto.createHash('md5').update(password).digest('hex');
        await userModel.createUser(username, forename, surname, email, hash);
        res.send("Signup successful");
    }
    catch (err) {
        console.log(err);
        res.send("Something went wrong, please try again");
    }
};

// In a real system this would probably use a code from an email or a text
exports.resetPassword = async (req, res) => {
    const identifier = req.body.identifier;
    const password = req.body.password;
    try {
        const hash = crypto.createHash('md5').update(password).digest('hex');
        await userModel.changePassword(identifier, hash);
    }
    catch (err) {
        console.log(err);
        res.send("Something went wrong, please try again");
    }
}