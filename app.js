const express = require('express');
const app = express();
const db = require('./src/config/db');
const port = process.env.port || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.listen(port, console.log(`Server listening on port ${port}`))

// Routes
app.use('/', require('./src/routes/index'));
app.use('/users', require('./src/routes/users'));