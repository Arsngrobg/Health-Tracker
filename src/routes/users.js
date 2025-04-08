const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// Importing JSON files to access page content
const main = require('../json/main.json');
const navigation = require('../json/navigation.json');
const login = require('../json/login.json');
const signup = require('../json/signup.json');
const footer = require('../json/footer.json');

router.get('/login', (req, res) => {
    res.render('../src/views/pages/login', {
        main: main,
        navigation: navigation,
        login: login,
        footer: footer
    });
});

router.get('/signup', (req, res) => {
    res.render('../src/views/pages/signup', {
        main: main,
        navigation: navigation,
        signup: signup,
        footer: footer
    });
});

router.post('/login', userController.login);
router.post('/signup', userController.signup);

module.exports = router;
