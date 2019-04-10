var express = require('express');
var router = express.Router();
var emailModel = require('../model/email');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('nav');
});


router.post('/create', function (req, res) {
	// const emailData = req.body.email
	// const result = await emailModel.query();

	// res.send(result);

	const result = emailModel.query().insert({
		email: req.body.email
	}).then(email => {
		res.status(200);
		res.send(email)
		res.json({
			success: true,
			message: result
		});
	}).catch(err => {
		res.status(500);
		res.json({
			success: false,
			message: err
		});
	});
});

module.exports = router;
