const db = require('../config/db');


const addEntry = async(Name) => {
    console.log("trying")
    try{
        console.log("trying")
        await db.execute('INSERT INTO Meal (Name) VALUES (?)',[Name]);
            console.log(Name);
    }

    catch (err) {
        throw err;
    }
};

module.exports = {
    addEntry,
}