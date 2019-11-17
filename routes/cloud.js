const express = require('express');
const router = express.Router();
const {google} = require('googleapis');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json([]);
});

module.exports = router;
