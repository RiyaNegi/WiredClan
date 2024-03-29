import Sequelize from 'sequelize';
import path from 'path';

import connection from './connection';

// eslint-disable-next-line import/no-mutable-exports
let database;

switch (process.env.NODE_ENV) {
  // case 'production':
  //   database = new Sequelize(
  //     connection.production.database,
  //     connection.production.username,
  //     connection.production.password,
  //     {
  //       host: connection.production.host,
  //       dialect: connection.production.dialect,
  //       pool: {
  //         max: 5,
  //         min: 0,
  //         idle: 10000,
  //       },
  //     },
  //   );
  //   break;
  case 'testing':
    database = new Sequelize(
      connection.testing.database,
      connection.testing.username,
      connection.testing.password,
      {
        host: connection.testing.host,
        dialect: connection.testing.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      },
    );
    break;
  default:
    database = new Sequelize(
      connection.development.database,
      connection.development.username,
      connection.development.password,
      {
        host: connection.development.host,
        dialect: connection.development.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        storage: path.join(process.cwd(), 'db', 'database.sqlite'),
        logging: process.env.NODE_ENV !== 'production',
      },
    );
}

export default database;
