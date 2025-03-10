const express = require('express');
const router = express.Router();

// Importing JSON files to access page content
const main = require('../json/main.json');
const navigation = require('../json/navigation.json');
const index = require('../json/index.json');
const footer = require('../json/footer.json');

router.get('/', (req, res) => {
    res.render('../src/views/pages/index', {
        main: main,
        navigation: navigation,
        index: index,
        footer: footer
    });
});

module.exports = router;