var knexClass = require('knex');
var Config = require('../knexfile');
var BaseModel = require('./base');


class Product extends BaseModel {
  static get tableName() {
    return 'products';
  }
 
 static get relationMappings() {
 	const date = new Date();
    return {
      order: {
        relation: BaseModel.HasManyRelation,
        modelClass: `${__dirname}/order`,
         filter: {
          datePurchased: date
        },
        join: {
          from: 'products.id',
          to: 'order.productId'
        }
      },
      prediction: {
        relation: BaseModel.HasManyRelation,
        modelClass: `${__dirname}/prediction`,
         filter: {
          date: date
        },
        join: {
          from: 'products.id',
          to: 'prediction.productId'
        }
      },
      preparedOrder: {
        relation: BaseModel.HasManyRelation,
        modelClass: `${__dirname}/order`,
         filter: {
          datePurchased: date,
          isPrepared: true
        },
        join: {
          from: 'products.id',
          to: 'order.productId'
        }
      },
     };
   } 


}

module.exports = Product;
