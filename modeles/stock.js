
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
  // stock.belongsTo(produit, {
  //   foreignKey: {
  //     name: 'id_produit', 
  //     allowNull: false 
  //   },
  //   onDelete: 'CASCADE' 
  // })
  stock.sync()
  .then(() => {
    console.log('Le modèle stock a été synchronisé avec la base de données.');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation du modèle User :', error);
  });

module.exports = stock;