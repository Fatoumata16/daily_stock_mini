const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('daily_stock_mini', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  // Vous pouvez ajouter d'autres options ici, si nécessaire
});

module.exports = sequelize;
