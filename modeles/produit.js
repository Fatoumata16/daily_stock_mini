const stock=require('../modeles/stock')
const { DataTypes } = require("sequelize");
const sequelize=require('../configuration/sequelize_config')
const user=require('../modeles/user')
const appro=require('../modeles/appro')
const produit = sequelize.define('produit', {
    id_produit: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    libelle: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    stock_min: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    prix_achat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
    },
    prix_vente: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'produit' ,
    timestamps: false
  });
  produit.belongsTo(user, {
    foreignKey: {
      name: 'id_user', 
      allowNull: false 
    },
    onDelete: 'CASCADE' 
  })
  produit.hasOne(stock, {
    foreignKey: {
      name: 'id_produit',
      allowNull: false
    }
  });
  produit.sync()
module.exports = produit;