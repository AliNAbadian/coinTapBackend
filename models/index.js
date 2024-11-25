require('dotenv').config();
const Sequelize = require('sequelize');

// Initialize Sequelize with MySQL
const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '465835',
  database: process.env.DB_NAME || 'cointap_db',
  logging: console.log, // Log queries for debugging
});


const db = {
  sequelize,
  Sequelize,
  Coin: require('./coin')(sequelize, Sequelize),
  User: require('./user')(sequelize, Sequelize),
};

module.exports = db;
