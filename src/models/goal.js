const db = require('../config/db');

const addGoal = async(userID, type, duration, distance, calories, weight, date) => {
    try {
        await db.execute('INSERT INTO Goal (UserID, Type, Duration, Distance, Calories, Weight, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userID, type, duration, distance, calories, weight, date]);
    }
    catch (err) {
        throw err;
    }
};

const fetchAll = async(userID) => {
    try{
        console.log(userID);

        const [goals] = await db.query('SELECT * FROM Goal WHERE UserID = ?', [userID]);

        return goals;
    }
    catch (err){
        console.log(err);
    }
};

module.exports = {
    addGoal,
    fetchAll
};