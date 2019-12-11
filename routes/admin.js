const express = require('express');
const router = express.Router();
const participants = require('../models/participants.model')

router.get('/', async function(req, res, next) {
   participants.getAllParticipants().then(result => {
     res.json(result.data);
     return;
   }).catch(e => {
     res.status(500).json({
       status: 500,
       msg: 'Internal server error'
     })
   })

});

router.post('/createAdmin', function(req, res, next) {
  const participant = {
    email: "admin@gmail.com",
    password: "$2a$08$loTSHMhvC8bTfAvKqu99pe8zAsuFn2fMS2Ib8blwynTYGM1E.VHWi",
    name: "Administrador",
    registered: `${new Date().getTime()}`
  }
  participants.createAdmin(participant).then(docs => {
     res.json(docs);
  }).catch(err => {
    res.status(400).json({
      err, 
      msg: 'Bad Request'
    })
  })
});

router.get('/:id', async function(req, res, next) {
  const params = req.params.id
  try {
    const result = await participants.getParticipantByEmail(params);
    res.json(result.data);
    return;
  } catch(e) {
    res.status(404).json({
      msg: 'Not Found'
    })
    return;
  }
});

router.delete('/:id', function(req, res, next) {
  const params = req.params.id
  participants.deleteParticipant(params).then(docs => {
     res.json(docs);
  }).catch(e => {
    res.status(404).json({
      msg: 'Not Found'
    })
  })
});

module.exports = router;
