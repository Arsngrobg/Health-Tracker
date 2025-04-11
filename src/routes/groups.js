const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const groupController = require('../controllers/group-controller');
const goalController = require('../controllers/goal-controller');

// Importing JSON files to access page content
const groups = require('../json/groups.json');

router.get('/', (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        res.render('../src/views/pages/groups', {
            groups: groups
        });
    }
});

module.exports = router;