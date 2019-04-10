// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    debug: true,
    // local-dev
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5433,
      user: process.env.DB_USER || 'rishi',
      password: process.env.DB_PASS || 'wishberry',
      database: process.env.DB_NAME || 'dalviroo',
      charset: 'utf8'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    debug: true,
    // local-dev
    connection: {
      host: process.env.DB_HOST || 'ec2-23-23-92-204.compute-1.amazonaws.com',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'ulzqbekboodbpn',
      password: process.env.DB_PASS || '17df2553246a19e0cbb4ca924fa5f5d344182bb5af13842361b789cf5928f68a',
      database: process.env.DB_NAME || 'd5p641cprdc3ps',
      charset: 'utf8'
    },
    useNullAsDefault: true
  }

};
