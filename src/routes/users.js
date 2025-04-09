const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// Importing JSON files to access page content
const login = require('../json/login.json');
const signup = require('../json/signup.json');
const resetPassword = require('../json/reset-password.json')

router.get('/login', (req, res) => {
    res.render('../src/views/pages/login', {
        login: login
    });
});

router.get('/signup', (req, res) => {
    res.render('../src/views/pages/signup', {
        signup: signup
    });
});

router.get('/resetPassword', (req, res) => {
    res.render('../src/views/pages/reset-password', {
        resetPassword : resetPassword
    })
})

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/resetPassword', userController.resetPassword);

module.exports = router;
