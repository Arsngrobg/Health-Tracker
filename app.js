const express = require('express');
const app = express();
const db = require('./src/config/db');
require('dotenv').config();
const port = process.env.port || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(port, console.log(`Server listening on port ${port}`))

// Routes
app.use('/', require('./src/routes/index'));