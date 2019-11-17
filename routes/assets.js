const express = require('express');
const router = express.Router();
const assetsModel = require('../models/assets.model')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json([]);
});

module.exports = router;
