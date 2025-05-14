const db = require('../config/db');

const addGoal = async(userID, type, duration, distance, caloriesBurned, caloriesEaten, weight, date) => {
    try {
        await db.execute('INSERT INTO Goal (UserID, type, Duration, Distance, CaloriesBurned, CaloriesEaten, Weight, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [userID, type, duration, distance, caloriesBurned, caloriesEaten, weight, date]);
    }
    catch (err) {
        throw err;
    }
};

const fetchAll = async(userID, date) => {
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

const completeGoal = async(goalID) => {
    try{
        await db.execute('UPDATE Goal SET Completed = true WHERE GoalID = ?',
            [goalID]);
    }
    catch (err){
        throw err;
    }
};

module.exports = {
    addGoal,
    completeGoal,
    fetchAll
};