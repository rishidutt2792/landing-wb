var express = require('express');
var router = express.Router();
var Config = '../config/config.json';
var predictionModel = require('../model/prediction');
var moment = require('moment');
var _ = require("lodash");

/* GET home page. */
router.get('/', function(req, res) {
    res.render('prediction');
});

router.post('/create', function(req, res) {

    req.body.date = moment().format("YYYY-MM-DD");

    const predictedValue = predictionModel.query().where('productId', req.body.productId).andWhere('date', new Date()).then(valuePresent => {
        if (!_.isEmpty(valuePresent)) {
            res.json({
                success: false,
                message: 'prediction already set for this product'
            });
        } else {
            const prediction = predictionModel.query().insert(req.body).then(prediction => {
                res.status(200);
                res.json({
                    success: true,
                    message: 'prediction placed for this product'
                });
            }).catch(prediction => {
                res.status(500);
                res.json({
                    success: false,
                    message: 'error submitting prediction'
                });
            });
        }
    });

});

module.exports = router;