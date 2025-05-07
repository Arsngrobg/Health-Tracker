const db = require('../config/db');


const addEntry = async(user, Name) => {
    console.log("trying")
    try{

        await db.execute('INSERT INTO Meal (UserID, Name) VALUES (?, ?)',[user, Name]);
            console.log(Name);
    }

    catch (err) {
        throw err;
    }
};

module.exports = {
    addEntry,
}