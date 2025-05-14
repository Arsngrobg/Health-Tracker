const db = require('../config/db');


const addMeal = async(userID, name) => {
    try{
        await db.execute('INSERT INTO Meal (UserID, Name) VALUES (?, ?)', [userID, name]);
    }
    catch (err) {
        throw err;
    }
};

const addMealConsumable = async(userID, consumableID) => {
    try{
        const [meal] = await db.query('SELECT MealID FROM Meal WHERE UserID = ? ORDER BY MealID DESC LIMIT 1', [userID]);
        if (meal.length === 0) {
            return null;
        }
        const mealID = meal[0].MealID;
        await db.execute('INSERT INTO MealConsumable (MealID, ConsumableID) VALUES (?, ?)', [mealID, consumableID])
    }
    catch (err) {
        throw err;
    }
};

const fetchAll = async(userID) => {
    try {
        const [result] = await db.query('SELECT * FROM Meal WHERE UserID = ? OR UserID IS NULL', [userID]);
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

const getMealConsumables = async(mealID) => {
    try {
        const [result] = await db.query('SELECT * FROM MealConsumable WHERE MealID = ?', [mealID]);
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
    addMeal,
    addMealConsumable,
    getMealConsumables,
    fetchAll
};