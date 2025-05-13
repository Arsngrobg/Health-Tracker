const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercise-controller');

// Importing JSON files to access page content
const exercise = require('../json/exercise.json');

router.get('/', async (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        const exercises = ['Running', 'Walking', 'Swimming', 'Cycling', 'Squats', 'Pushups', 'Situps'];
        res.render('../src/views/pages/exercise', { 
            exercise: exercise,
            exercises: exercises
        });
    }
});

router.post('/', exerciseController.addEntry);

module.exports = router;