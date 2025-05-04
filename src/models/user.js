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

const deleteUser = async(username) => {
    try {
        await db.execute('DELETE FROM User WHERE Username = ?', [username]);
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

const updateDOB = async(dob, userID) => {
    try {
        await db.execute('UPDATE User SET DOB = ? WHERE UserID = ?', [dob, userID]);
    }
    catch (err) {
        throw err;
    }
}



module.exports = {
    createUser,
    deleteUser,
    findUser,
    changePassword,
    updateDOB
}