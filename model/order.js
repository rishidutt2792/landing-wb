var knexClass = require('knex');
var Logger = require('winston');
var Config = require('../knexfile');
var BaseModel = require('./base');



class Order extends BaseModel {
  static get tableName() {
    return 'order';
  }

  static get relationMappings() {
    const date = new Date();
    return {
      product: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: `${__dirname}/product`,
        join: {
          from: 'order.productId',
          to: 'products.id'
        }
      },

    };
  }
}

module.exports = Order;
