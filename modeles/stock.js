
const { DataTypes } = require("sequelize");
const sequelize=require('../configuration/sequelize_config')
const produit=require('../modeles/produit')

const stock = sequelize.define('stock', {
    id_stock: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    quantite: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
  }, {
    tableName: 'stock' ,
    timestamps: false
  });
  stock.sync()
 

module.exports = stock;