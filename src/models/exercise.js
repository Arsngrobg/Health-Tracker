const db = require('../config/db');

const addEntry = async(activity, userID, duration, distance, calories, count) => {
    try {
        await db.execute('INSERT INTO ExerciseEntry(Activity, UserID, Duration, Distance, Calories, Count) VALUES (?, ?, ?, ?, ?, ?)',
            [activity, userID, duration, distance, calories, count]);
    }
    catch (err) {
        throw err;
    }
};

const fetchAll = async(userID, date = null) => {
    try {
        let result;
        if(date) {
            const [query] = await db.query(`SELECT * FROM ExerciseEntry WHERE UserID = ? AND Date >= ?`, [userID, date]);
            result = query;
        }
        else {
            const [query] = await db.query(`SELECT * FROM ExerciseEntry WHERE UserID = ?`, [userID]);
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

const deleteEntries = async(userID) => {
    try {
        await db.execute('DELETE FROM ExerciseEntry WHERE UserID = ?', [userID]);
    }
    catch (err) {
        console.log(err);
    }
};

const weeklyWorkouts = async(userID) => {
    try {
        const [result] = await db.execute('SELECT COUNT(*) AS count FROM ExerciseEntry WHERE UserID = ? AND Date >= CURDATE() - INTERVAL 7 DAY', [userID]);
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

module.exports = {
    addEntry,
    fetchAll,
    deleteEntries,
    weeklyWorkouts
};