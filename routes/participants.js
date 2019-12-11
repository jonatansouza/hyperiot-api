const express = require('express');
const router = express.Router();
const participants = require('../models/participants.model')
const auth = require('../interceptors/auth.interceptor')

router.get('/', auth, (req, res, next) => {
   participants.getAllParticipantsOnWhiteList(req).then(result => {
     res.json(result);
     return;
   }).catch(e => {
     res.status(500).json({
       status: 500,
       msg: 'Internal server error'
     })
   })
});

router.post('/', auth, function(req, res, next) {
  participants.insertParticipant(req || {}).then(docs => {
     res.json(docs);
  }).catch(err => {
    res.status(400).json({
      err, 
      msg: 'Bad Request'
    })
  })
});

router.get('/:id', auth, async function(req, res, next) {
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

router.delete('/:id', auth, function(req, res, next) {
  participants.deleteParticipant(req).then(docs => {
     res.json(docs);
  }).catch(e => {
    res.status(404).json({
      msg: 'Not Found'
    })
  })
});

module.exports = router;
