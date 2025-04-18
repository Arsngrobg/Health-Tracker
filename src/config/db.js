const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Database connected successfully");
});

module.exports = connection;