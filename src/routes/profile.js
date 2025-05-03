const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// Importing JSON files to access page content
const profile = require('../json/profile.json');

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

router.get('/', (req, res) => {
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
        res.render('../src/views/pages/profile', {
            profile: profile,
            user: res.locals.user,
            age: age
        });
    }
});

module.exports = router;