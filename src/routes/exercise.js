const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercise-controller');
const goalController = require('../controllers/goal-controller');
const exerciseModel = require('../models/exercise');

// Importing JSON files to access page content
const exercise = require('../json/exercise.json');

router.get('/', async (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
       try {
            const count = await exerciseModel.getExercise();
            console.log(count)
            const result = count.map(item => item.Activity);
               
            res.render('../src/views/pages/exercise', { Exercise: result });
               
                   }
        catch (err) {
                console.log(err);
            }
    }
});


router.post('/', exerciseController.addEntry);

module.exports = router;