const db = require('../config/db');

const deleteEntries = async(userID) => {
    try {
        await db.execute('DELETE FROM DietEntry WHERE UserID = ?', [userID]);
    }
    catch (err) {
        console.log(err);
    }
};

const mealsToday = async(userID) => {
    try {
        const [result] = await db.execute('SELECT COUNT(*) AS count FROM DietEntry WHERE UserID = ? AND Date = CURDATE()', [userID]);
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
    deleteEntries,
    mealsToday
};