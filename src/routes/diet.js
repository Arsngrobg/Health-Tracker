const express = require('express');
const router = express.Router();
const dietController = require('../controllers/diet-controller');
const foodController = require('../controllers/food-controller');
const drinkController = require('../controllers/drink-controller');
const mealController = require('../controllers/drink-controller');

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

module.exports = router;