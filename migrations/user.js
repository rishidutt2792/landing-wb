exports.up = function (knex, Promise) {
  return Promise.all([

    // email model

    // order table
    knex.schema.createTableIfNotExists('email', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable().comment('name');
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    }).then(() => {
      console.log('Created Table: order table');
    }),


    //prediction table

  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.raw('drop table if exists email cascade'),
    knex.raw('drop table if exists products cascade'),
    knex.raw('drop table if exists order cascade'),
    knex.raw('drop table if exists prediction cascade')


  ]).then((values) => {
    console.log('dropped all tables : ', values);
  }, (reason) => {
    console.log('failed to rollback db : ', reason);
  });

};
