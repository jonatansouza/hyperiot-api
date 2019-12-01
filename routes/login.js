var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('login router');
});
/* POST  listing. */
router.post('/', async function(req, res, next) {
  const result = await loginController.login(req.body);
  if(!result){
    res.status(401).json({
      msg: 'unauthorized'
    })
    return;
  }
  res.json(result);
});

module.exports = router;
