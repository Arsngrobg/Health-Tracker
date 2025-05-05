const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const dietController = require('../controllers/diet-controller');
const exerciseController = require('../controllers/exercise-controller');

// Importing JSON files to access page content
const profile = require('../json/profile.json');
const edit = require('../json/profile-edit.json');

function calculateAge(dobString) {
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
    return age;
};

function formatDate(date) {
    const formatted = new Date(date);
    const year = formatted.getFullYear();
    const month = (formatted.getMonth() + 1).toString().padStart(2, '0');
    const day = formatted.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

router.get('/', async (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        let age = null;
        if(res.locals.user.DOB != null) {
            age = calculateAge(res.locals.user.DOB);
        }
        else {
            age = '';
        }
        //const workouts = await exerciseController.weeklyWorkouts(req, res);
        //const meals = await dietController.mealsToday(req, res);
        const dateJoined = res.locals.user.DateJoined ? formatDate(res.locals.user.DateJoined) : '';
        res.render('../src/views/pages/profile', {
            profile: profile,
            user: res.locals.user,
            age: age,
            dateJoined: dateJoined
        });
    }
});

router.get('/edit', (req, res) => {
    if(!res.locals.loggedIn) {
        res.redirect('/users/login');
    }
    else {
        const dob = res.locals.user.DOB ? formatDate(res.locals.user.DOB) : ''; // Formatting so it doesn't decrement by a day based on timezone
        res.render('../src/views/pages/profile-edit', {
            edit: edit,
            user: res.locals.user,
            dob: dob
        });
    }
});

router.post('/edit', userController.updateUserProfile);

module.exports = router;