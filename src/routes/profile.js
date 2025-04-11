const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// Importing JSON files to access page content
const profile = require('../json/profile.json');

router.get('/', (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        res.render('../src/views/pages/profile', {
            profile: profile
        });
    }
});

module.exports = router;