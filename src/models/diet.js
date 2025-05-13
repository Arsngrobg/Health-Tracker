const db = require('../config/db');

const deleteEntries = async(userID) => {
    try {
        await db.execute('DELETE FROM DietEntry WHERE UserID = ?', [userID]);
    }
    catch (err) {
        console.log(err);
    }
};

const mealsToday = async(userID) => {
    try {
        const [result] = await db.execute('SELECT COUNT(*) AS count FROM DietEntry WHERE UserID = ? AND Date = CURDATE()', [userID]);
        if (result.length === 0) {
            return null;
        }
        return result[0];
    }
    catch (err) {
        console.log(err);
        return 0;
    }
};

const addEntry = async(userID, mealID) => {
    try {
        await db.execute('INSERT INTO DietEntry (UserID, MealID) VALUES (?, ?)', [userID, mealID]);
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    deleteEntries,
    mealsToday,
    addEntry
};