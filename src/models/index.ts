import dbConfig from "../configs/db.config";

import { Dialect, Sequelize } from "sequelize";

const connection = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.USERNAME,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect as Dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      idle: dbConfig.pool.idle,
      acquire: dbConfig.pool.acquire,
    },
  }
);

export default connection;
