const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercise-controller');
const goalController = require('../controllers/goal-controller');

// Importing JSON files to access page content
const exercise = require('../json/exercise.json');

router.get('/', (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        res.render('../src/views/pages/exercise', {
            exercise: exercise
        });
    }
});

router.post('/addEntry', exerciseController.addEntry);

module.exports = router;