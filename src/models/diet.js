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

const fetchAll = async(userID, date) => {
    try {
        let result;
        if(date) {
            const [query] = await db.query(`SELECT * FROM DietEntry WHERE UserID = ? OR UserID IS NULL AND Date >= ?`, [userID, date]);
            result = query;
        }
        else {
            const [query] = await db.query(`SELECT * FROM DietEntry WHERE UserID = ? OR UserID IS NULL`, [userID]);
            result = query;
        }
        if (result.length === 0) {
            return null;
        }
        return result;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
};

const fetchAllHistory = async(userID) => {
    try {
        const [result] = await db.query(`SELECT DietEntry.EntryID, DietEntry.Date, DietEntry.MealID, Meal.Name AS Name FROM DietEntry JOIN Meal ON DietEntry.MealID = Meal.MealID
            WHERE DietEntry.UserID = ? ORDER BY DietEntry.Date DESC`, [userID]);
        if (result.length === 0) {
            return null;
        }
        return result;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
};

module.exports = {
    deleteEntries,
    mealsToday,
    fetchAll,
    fetchAllHistory,
    addEntry
};