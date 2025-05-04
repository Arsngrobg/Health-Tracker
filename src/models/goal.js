const db = require('../config/db');

const addGoal = async(userID, duration, distance, calories, weight) => {
    try {
        await db.execute('INSERT INTO Goal (UserID, Duration, Distance, Calories, Weight) VALUES (?, ?, ?, ?, ?)',
            [userID, duration, distance, calories, weight]);
    }
    catch (err) {
        throw err;
    }
};

const fetchAll = async(userID) => {
    const [goals] = await db.execute(`SELECT Duration, Distance, Calories, Weight, Date FROM Goal WHERE UserID = ? GROUP BY Date ORDER BY Date ASC`, userID);
    return goals;
};

module.exports = {
    addGoal,
    fetchAll
};