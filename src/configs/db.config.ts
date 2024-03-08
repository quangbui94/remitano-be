export default {
    HOST: process.env.DB_HOST || "db",
    USERNAME: process.env.DB_USERNAME || "postgres",
    PASSWORD: process.env.DB_PASSWORD || "postgres",
    DB_NAME: process.env.DB_NAME || "db",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
  };