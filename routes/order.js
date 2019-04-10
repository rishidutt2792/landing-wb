var express = require('express');
var router = express.Router();
var Config = '../config/config.json';
var orderModel = require('../model/order');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('order');
});

router.post('/create', function(req, res) {
    req.body.datePurchased = moment().format("YYYY-MM-DD");
    const result = orderModel.query().insert(req.body).then(order => {
        res.status(200);
        res.json({
            success: true,
            message: order
        });
    }).catch(order => {
        res.status(500);
        res.json({
            success: false,
            message: order
        });
    });
});


router.put('/update', function(req, res) {
    const result = orderModel.query().patch({
        isPrepared: true
    }).where('id', req.body.orderId).then(order => {
        res.status(200);
        res.json({
            success: true,
            message: order
        });
    }).catch(order => {
        res.status(500);
        res.json({
            success: false,
            message: order
        });
    });
});

module.exports = router;