const db = require('../config/db');

const addGoal = async(userID, duration, distance, caloriesBurned, caloriesEaten, weight) => {
    try {
        await db.execute('INSERT INTO Goal (UserID, Duration, Distance, CaloriesBurned, CaloriesEaten, Weight) VALUES (?, ?, ?, ?, ?, ?)',
            [userID, duration, distance, caloriesBurned, caloriesEaten, weight]);
    }
    catch (err) {
        throw err;
    }
};

const fetchAll = async(userID, date = null) => {
    try {
        let result;
        if(date) {
            const [query] = await db.query(`SELECT * FROM Goal WHERE UserID = ? AND Date >= ?`, [userID, date]);
            result = query;
        }
        else {
            const [query] = await db.query(`SELECT * FROM Goal WHERE UserID = ?`, [userID]);
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

module.exports = {
    addGoal,
    fetchAll
};