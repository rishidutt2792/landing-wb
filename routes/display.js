var express = require('express');
var router = express.Router();
var ProductModel = require('../model/product');
var OrderModel = require('../model/order');
var excel = require('node-excel-export');
var moment = require('moment');



router.get('/', function(req, res, next) {
    res.render('display', {
        url: 'Expsress'
    });
});


router.get('/getDisplay', function(req, res) {
     
    const date = moment().format("YYYY-MM-DD");

    const result = OrderModel.query().eager('product.[prediction,preparedOrder]').where('datePurchased', date).orderBy('isPrepared').then(order => {

      // iterate over order to calc diff params
        order.forEach(function(val) {
            var totalQuantity = 0;
            var totalPrepared = 0;
            var totalPredicted = 0;
            val.product.prediction.forEach(function(value) {
                totalPredicted = value.prediction;
            });
            val.product.preparedOrder.forEach(function(value) {
                totalPrepared = totalPrepared + value.quantity;
            });
            val.totalPredicted = totalPredicted;
            val.totalPrepared = totalPrepared;
        });
        res.json({
            success: true,
            order
        });
    }).catch(order => {
        res.status(500);
        res.json({
            success: false,
            message: 'no data found'
        });
    });
});


router.get('/downloadReport', function(req, res) {

    // get product details
    const result = ProductModel.query().eager('[order.product,prediction]').then(product => {

        product.forEach(function(value) {
            var totalQuantity = 0;
            var totalPrepared = 0;
            var totalPredicted = 0;

            value.order.forEach(function(val) {
                if (val.isPrepared === true) {
                    totalPrepared = totalPrepared + val.quantity;
                } else {
                    totalQuantity = totalQuantity + val.quantity;
                }
            });

            value.prediction.forEach(function(predicted) {
                totalPredicted = predicted.prediction;
            });


            value.totalPredicted = totalPredicted;
            value.totalQuantity = totalQuantity;
            value.totalPrepared = totalPrepared;

        });

        const styles = {
            headerDark: {
                fill: {
                    fgColor: {
                        rgb: 'FF000000'
                    }
                },
                font: {
                    color: {
                        rgb: 'FFFFFFFF'
                    },
                    sz: 14,
                    bold: true,
                    underline: true
                }
            }
        };


        //Here you specify the export structure
        const specification = {
            name: { // <- the key should match the actual data key
                displayName: 'Product', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                width: 120 // <- width in pixels
            },
            totalPrepared: {
                displayName: 'Prepared',
                headerStyle: styles.headerDark,
                // cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
                //   return (value == 1) ? 'Active' : 'Inactive';
                // },
                width: '10' // <- width in chars (when the number is passed as string)
            },
            totalPredicted: {
                displayName: 'Predicted',
                headerStyle: styles.headerDark,
                // cellStyle: styles.cellPink, // <- Cell style
                width: 220 // <- width in pixels
            }
        };
        // Define an array of merges. 1-1 = A:1
        // The merges are independent of the data.
        // A merge will overwrite all data _not_ in the top-left cell.
        const merges = [{
            start: {
                row: 2,
                column: 6
            },
            end: {
                row: 2,
                column: 10
            }
        }]

        // Create the excel report.
        // This function will return Buffer
        const report = excel.buildExport(
            [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
                {
                    name: 'Report', // <- Specify sheet name (optional)
                    // heading: heading, // <- Raw heading array (optional)
                    merges: merges, // <- Merge cell ranges
                    specification: specification, // <- Report specification
                    data: product // <-- Report data
                }
            ]
        );

        // You can then return this straight
        res.attachment('report.xlsx');
        return res.send(report);
    });
});




module.exports = router;