var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('login router');
});
/* POST  listing. */
router.post('/', loginController.login, (req, res, next) => {
  const {operationError, operationResult} = req;
  if(operationError){
    const {status, message} = operationError;
    res.status(status || 500).json({
      message
    })
    return;
  }
  res.status(200).json(operationResult);
  return;
});


/* POST  listing. */
router.post('/register', loginController.createUser, (req, res, next) => {
  const {operationError, operationResult} = req;
  if(operationError){
    res.status(401).json({
      msg: 'user already exists'
    })
    return;
  }
  res.status(201).json(operationResult);
  return;
});

module.exports = router;
