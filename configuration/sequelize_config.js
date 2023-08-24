const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('daily_stock_mini', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

module.exports = sequelize;
