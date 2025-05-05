const db = require('../config/db');

// Password should be hashed before insertion
const createUser = async(username, forename, surname, email, password) => {
    try {
        await db.execute('INSERT INTO User (Username, Forename, Surname, Email, Password) VALUES (?, ?, ?, ?, ?)', 
            [username, forename, surname, email, password]);
    }
    catch (err) {
        throw err;
    }
};

const deleteUser = async(userID) => {
    try {
        await db.execute('DELETE FROM User WHERE UserID = ?', [userID]);
    }
    catch (err) {
        throw err;
    }
};

// For getting a user by username or email (logging in)
const findUser = async(identifier) => {
    const [user] = await db.promise().execute('SELECT * FROM User WHERE Username = ? OR Email = ?', [identifier, identifier]);
    if (user.length === 0) {
        return null;
    }
    return user[0];
};

// For password reset
const changePassword = async(identifier, password) => {
    try {
        await db.execute('UPDATE User SET password = ? WHERE Username = ? OR Email = ?', [password, identifier, identifier]);
    }
    catch (err) {
        throw err;
    }
};

const updateUserProfile = async(userID, username, forename, surname, dob) => {
    try {
        await db.execute('UPDATE User SET Username = ?, Forename = ?, Surname = ?, DOB = ? WHERE UserID = ?', [username, forename, surname, dob, userID]);
    }
    catch (err) {
        throw err;
    }
};

const updateUserAccount = async(userID, username, email) => {
    try {
        await db.execute('UPDATE User SET Username = ?, Email = ? WHERE UserID = ?', [username, email, userID]);
    }
    catch (err) {
        throw err;
    }
};

const clearHealth = async(userID) => {
    try {
        await db.execute('UPDATE User SET Height = ?, Weight = ? WHERE UserID = ?', ['', '', userID]);
    }
    catch (err) {
        throw err;
    }
};

const updateUserHealth = async(userID, weight, height) => {
    try {
        await db.execute('UPDATE User SET Height = ?, Weight = ? WHERE UserID = ?', [userID, weight, height]);
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    createUser,
    deleteUser,
    findUser,
    changePassword,
    updateUserProfile,
    updateUserAccount,
    clearHealth,
    updateUserHealth
};