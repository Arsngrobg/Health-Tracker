const db = require('../config/db');


const addEntry = async(user, Name, Consumable, Grams) => {
    console.log("trying")
    try{

        await db.execute('INSERT INTO Meal (UserID, Name) VALUES (?, ?)',[user, Name]);
            console.log(Name);


        const [result] = await db.query('SELECT MealID FROM Meal WHERE UserID = ? ORDER BY MealID DESC LIMIT 1', [user]);
        if (result.length === 0) {
            return null;
        }

        const mealID = result[0].MealID;
        console.log(mealID);

        const [result2] = await db.query('SELECT ConsumableID FROM consumable WHERE UserID = ? OR UserID IS NULL AND Name = ?', [user, Consumable])
        console.log(result2)

        const ConsumableID = result2[0].ConsumableID;
        console.log(ConsumableID)

        await db.execute('INSERT INTO MealConsumable (MealID, ConsumableID) VALUES (?,?)', [mealID, ConsumableID ])
    }

    catch (err) {
        throw err;
    }
};

const getMeal = async(userID) => {
    try {
        const [result] = await db.query('SELECT Name FROM Meal WHERE UserID = ?', [userID]);
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
    addEntry,
    getMeal
}