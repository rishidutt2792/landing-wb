var knexClass = require('knex');
var Config = require('../knexfile');
var BaseModel = require('./base');



class Email extends BaseModel {
	static get tableName() {
		return 'email';
	}

}

module.exports = Email;
