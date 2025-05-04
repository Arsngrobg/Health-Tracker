const db = require('../config/db');

const addEntry = async(activity, userID, duration, distance, calories) => {
    try {
        await db.execute('INSERT INTO ExerciseEntry (Activity, UserID, Duration, Distance, Calories) VALUES (?, ?, ?, ?, ?)',
            [activity, userID, duration, distance, calories]);
    }
    catch (err) {
        throw err;
    }
};

const fetchAll = async(userID) => {
    const [exerciseEntries] = await db.execute(`SELECT Duration, Distance, Calories, Date FROM ExerciseEntry WHERE UserID = ? GROUP BY Date ORDER BY Date ASC`, userID);
    return exerciseEntries;
}

module.exports = {
    addEntry,
    fetchAll
}