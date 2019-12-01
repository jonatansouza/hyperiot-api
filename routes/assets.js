/* GET users listing. */
const express = require('express');
const router = express.Router();
const assets = require('../models/assets.model')
const auth = require('../interceptors/auth.interceptor')

/* GET users listing. */
router.get('/', auth, function (req, res, next) {
    assets.getAllAssets(req).then(docs => {
        res.json(docs);
    })
});

router.post('/', auth, function (req, res, next) {
    assets.insertAssets(req || {}).then(docs => {
        res.json(docs.data);
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

router.delete('/:id', async (req, res, next) => {
    const params = req.params.id;
    const result = await assets.deleteAssets(params);
    if(!result){
        res.status(404).json({
            msg: 'NotFound'
        })
        return;
    }
    res.json(result);
});

module.exports = router;
