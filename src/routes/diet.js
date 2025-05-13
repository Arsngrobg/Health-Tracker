const express = require('express');
const router = express.Router();
const dietController = require('../controllers/diet-controller');
const consumableController = require('../controllers/consumable-controller');
const mealController = require('../controllers/meal-controller');

// Importing JSON files to access page content
const diet = require('../json/diet.json');

router.get('/', async (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        const meals = await mealController.fetchAll(req, res) || [];
        const consumables = await consumableController.fetchAll(req, res) || [];
        res.render('../src/views/pages/diet', {
            diet: diet,
            meals: meals,
            consumables: consumables
        });
    }
});

router.post('/consumable', consumableController.addConsumable);
router.post('/meal', mealController.addMeal);
router.post('/dietentry', dietController.addEntry)

module.exports = router;