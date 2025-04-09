const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.listen(port, console.log(`Server listening on port ${port}`))

const main = require('./src/json/main.json');
const navigation = require('./src/json/navigation.json');
const footer = require('./src/json/footer.json');

app.use((req, res, next) => {
    res.locals.main = main;
    res.locals.navigation = navigation;
    res.locals.footer = footer;
    next();
});

// Routes
app.use('/', require('./src/routes/index'));
app.use('/users', require('./src/routes/users'));