const express = require('express');
const router = express.Router();

// Importing JSON files to access page content
const index = require('../json/index.json');

router.get('/', (req, res) => {
    res.render('../src/views/pages/index', {
        index: index
    });
});

module.exports = router;