const express = require('express');
const router = express.Router();
const dietController = require('../controllers/diet-controller');
const consumableController = require('../controllers/consumable-controller');
const mealController = require('../controllers/meal-controller');

// Importing JSON files to access page content
const diet = require('../json/diet.json');

router.get('/', (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        res.render('../src/views/pages/diet', {
            diet: diet
        });
    }
});

router.post('/', consumableController.addEntry);
router.post('/', mealController.addEntry);
// router.post('/', dietController.addEntry);


module.exports = router;