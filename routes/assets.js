/* GET users listing. */
const express = require('express');
const router = express.Router();
const assets = require('../models/assets.model')

/* GET users listing. */
router.get('/', function (req, res, next) {
    assets.getAllAssets().then(docs => {
        res.json(docs.data);
    })
});

router.post('/', function (req, res, next) {
    assets.insertAssets(req.body || {}).then(docs => {
        res.json(docs);
    }).catch(err => {
        res.status(400).json({
            err,
            msg: 'Bad Request'
        })
    })
});

router.put('/:id', function (req, res, next) {
    assets.updateAsset(req.params.id, req.body).then(docs => {
        res.json(docs);
    }).catch(err => {
        res.status(400).json({
            err,
            message: 'Bad Request'
        })
    })
});

router.get('/:id', function (req, res, next) {
    const params = req.params.id;
    assets.getAllAssets(params).then(docs => {
        if (docs.length) {
            res.json(docs[0]);
            return;
        }
        res.status(404).send('Not found');
        return;
    })
});

router.delete('/:id', function (req, res, next) {
    const params = req.params.id;
    assets.deleteAssets(params).then(docs => {
        res.json(docs);
    })
});

module.exports = router;
