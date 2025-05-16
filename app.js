const express = require('express');
const app = express();
const port = process.env.port || 3000;
const session = require('express-session');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.listen(port, console.log(`Server listening on port ${port}`))

const navigation = require('./src/json/navigation.json');
const settings = require('./src/json/settings-bar.json');
const footer = require('./src/json/footer.json');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));
  
app.use((req, res, next) => {
    res.locals.navigation = navigation;
    res.locals.settings = settings;
    res.locals.footer = footer;
    res.locals.user = req.session.user || null;
    res.locals.loggedIn = req.session.user;
    next();
});

// Testing
const groups = require('./src/models/group.js');
groups.create('bombohehee')

// Routes
app.use('/', require('./src/routes/index'));
app.use('/users', require('./src/routes/users'));
app.use('/diet', require('./src/routes/diet'));
app.use('/exercise', require('./src/routes/exercise'));
app.use('/tracking', require('./src/routes/tracking'));
app.use('/groups', require('./src/routes/groups'));
app.use('/profile', require('./src/routes/profile'));
app.use('/settings', require('./src/routes/settings'));