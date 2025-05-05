const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const dietController = require('../controllers/diet-controller');
const exerciseController = require('../controllers/exercise-controller');

// Importing JSON files to access page content
const account = require('../json/account-settings.json');
const privacy = require('../json/privacy-settings.json');

router.get('/account', (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        res.render('../src/views/pages/account-settings', {
            account: account,
            user: res.locals.user
        });
    }
});

router.get('/privacy', (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        res.render('../src/views/pages/privacy-settings', {
            privacy: privacy,
            user: res.locals.user
        });
    }
});

router.post('/account', userController.updateUserAccount);
router.post('/privacy', userController.updateUserHealth);
router.post('/delete-account', userController.deleteUser);
router.post('/clear-health', userController.clearHealth);
router.post('/clear-entries', async (req, res) => {
    dietController.deleteEntries(req, res);
    exerciseController.deleteEntries(req, res);
    res.redirect('/settings/privacy');
});

module.exports = router;