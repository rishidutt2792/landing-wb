var express = require('express');
var router = express.Router();
var Config = '../config/config.json';
var ProductModel = require('../model/product');

router.get('/', function(req, res) {
    const result = ProductModel.query().then(product => {
        res.json({
            success: true,
            product
        });
    }).catch(product => {
        res.status(500);
        res.json({
            success: false,
            message: 'no product found'
        });
    });
});

module.exports = router;