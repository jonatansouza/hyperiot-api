const express = require('express');
const router = express.Router();
const googleStorage = require('../models/google-cloud');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const files = await googleStorage.getFiles('hyperiot-storage1');
  res.json(files[0].map(el => el.name));
});

router.get('/:filename', async function(req, res, next) {
  const filename = req.params.filename;

  const file = await googleStorage.getFile('hyperiot-storage1', filename);
  res.download(file);
});
module.exports = router;