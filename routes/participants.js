const express = require('express');
const router = express.Router();
const participants = require('../models/participants.model')

/* GET users listing. */
router.get('/', function(req, res, next) {
  participants.getAllParticipants().then(docs => {
    res.json(docs);
  })
});

router.post('/', function(req, res, next) {
  participants.insertParticipant(req.body || {}).then(docs => {
     res.json(docs);
  })
});

router.get('/:id', function(req, res, next) {
  const params = {
    email: req.params.id
  }
  participants.getAllParticipants(params).then(docs => {
    if(docs.length){
      res.json(docs[0]);
      return;
    }
    res.status(404).send('Not found');
    return;
  })
});

router.delete('/:id', function(req, res, next) {
  const params = {
    email: req.params.id
  }
  participants.deleteParticipant(params).then(docs => {
     res.json(docs);
  })
});
module.exports = router;
