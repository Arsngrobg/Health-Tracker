const express = require('express');
const router = express.Router();
const dietController = require('../controllers/diet-controller');
const consumableController = require('../controllers/consumable-controller');
const mealController = require('../controllers/meal-controller');
const consumableModel = require('../models/consumable');


// Importing JSON files to access page content
const diet = require('../json/diet.json');

const names = require('../controllers/consumable-controller');

console.log(names)

router.get('/', async (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        const user = res.locals.user.UserID;
            try {
                const count = await consumableModel.getConsumable(user);
                const names = count.map(item => item.Name);
        
                res.render('../src/views/pages/diet', { consumable: names });
        
            }
        
            catch (err) {
                console.log(err);
            }
    }
});

router.get('/consumable', async (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        const user = res.locals.user.UserID;
            try {
                const count = await consumableModel.getConsumable(user);
                const names = count.map(item => item.Name);
        
                res.render('../src/views/pages/diet', { consumable: names });
        
            }
        
            catch (err) {
                console.log(err);
            }
    }
});

router.get('/dietentry', async (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        const user = res.locals.user.UserID;
            try {
                const count = await consumableModel.getConsumable(user);
                const names = count.map(item => item.Name);
        
                res.render('../src/views/pages/diet', { consumable: names });
        
            }
        
            catch (err) {
                console.log(err);
            }
    }
});

router.get('/meal', async (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        const user = res.locals.user.UserID;
            try {
                const count = await consumableModel.getConsumable(user);
                const names = count.map(item => item.Name);
        
                res.render('../src/views/pages/diet', { consumable: names });
        
            }
        
            catch (err) {
                console.log(err);
            }
    }
});


router.post('/consumable', consumableController.addEntry);
router.post('/meal', mealController.addEntry);
router.post('/dietentry', consumableController.getConsumable);


module.exports = router;