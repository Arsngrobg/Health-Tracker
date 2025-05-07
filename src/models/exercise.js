const db = require('../config/db');

const addEntry = async(activity, userID, duration, distance, calories) => {
    try {
        await db.execute('INSERT INTO ExerciseEntry (Activity, UserID, Duration, Distance, Calories) VALUES (?, ?, ?, ?, ?)',
            [activity, userID, duration, distance, calories]);
            console.log(activity);
    }
    catch (err) {
        throw err;
    }
};

const fetchAll = async(userID) => {
    try {
        const [exerciseEntries] = await db.execute(`SELECT Duration, Distance, Calories, Date FROM ExerciseEntry WHERE UserID = ? GROUP BY Date ORDER BY Date ASC`, userID);
        return exerciseEntries;
    }
    catch (err) {
        throw err;
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
        const [result] = await db.execute('SELECT COUNT(*) AS count FROM ExerciseEntry WHERE UserID = ? AND Date >= CURDATE() - INTERVAL 7 DAY;', [userID]);
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