const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// Importing JSON files to access page content
const account = require('../json/account.json');
const privacy = require('../json/privacy.json');

router.get('/account', (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        res.render('../src/views/pages/account-settings', {
            account: account
        });
    }
});

router.get('/privacy', (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        res.render('../src/views/pages/privacy-settings', {
            privacy: privacy
        });
    }
});

module.exports = router;