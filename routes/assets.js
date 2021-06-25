/* GET users listing. */
const express = require('express');
const router = express.Router();
const assets = require('../models/assets.model');
const auth = require('../interceptors/auth.interceptor');
const debug = require('debug')('hyperiot-api:server');


router.get('/shared-with-me', auth, function (req, res, next) {
    assets.getAllAssetsSharedWithMe(req).then(({data}) => {
        res.status(200).json(data || []);
    })
});


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

router.put('/:id', auth, function (req, res, next) {
    assets.updateAsset(req.params.id, req.body).then(docs => {
        res.json(docs);
    }).catch(err => {
        res.status(400).json({
            err,
            message: 'Bad Request'
        })
    })
});

router.get('/:id', auth, function (req, res, next) {
    assets.getAssetById(req).then(docs => {
        if (docs.data) {
            res.status(200).json(docs.data);
            return;
        }
        res.status(404).send('Not found');
        return;
    }).catch(e => {
        res.status(404).send('Not found');
        return;
    })
});

router.head('/:id', auth, async (req, res, next) => {
    assets.assetExists(req).then(docs => {
        if (docs.data) {
            res.status(200).json(docs.data);
            return;
        }
        res.status(404).send('Not found');
        return;
    }).catch(e => {
        res.status(404).send('Not found');
        return;
    })
});


router.delete('/:id', auth, async (req, res, next) => {
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


router.post('/:id/grant-access', auth, async (req, res, next) => {
    try {
        const result = await assets.grantAccess(req);
        res.status(200).json(result.data || {});
    } catch(err) {
        res.status(403).json({
            err,
            message: 'Forbidden'
        })
    }
});

router.post('/:id/revoke-access', auth, async (req, res, next) => {
    try {
        const result = await assets.revokeAccess(req);
        res.status(200).json(result.data || {});
    } catch(err) {
        res.status(403).json({
            err,
            message: 'Forbidden'
        })
    }
});

router.get('/:id/history', auth, async (req, res, next) => {
    try {
        const result = await assets.history(req);
        res.status(200).json(result.data || []);
    } catch(err) {
        res.status(403).json({
            err,
            message: 'Forbidden'
        })
    }
});

router.post('/:id/request-permission', auth, async (req, res, next) => {
    try {
        const result = await assets.requestPermission(req);
        res.status(200).json(result.data || {});
    } catch(err) {
        res.status(403).json({
            err,
            message: 'Forbidden'
        })
    }
});

module.exports = router;
