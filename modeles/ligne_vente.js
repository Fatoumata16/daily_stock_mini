const { DataTypes } = require("sequelize");
const sequelize=require('../configuration/sequelize_config')
const produit=require('../modeles/produit')
const vente=require('../modeles/vente')

const ligne_vente = sequelize.define('ligne_vente', {
    quantite: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },
  }, {
    tableName: 'ligne_vente' ,
    timestamps: false
  });
  vente.belongsToMany(produit, { through: ligne_vente ,foreignKey: 'id_vente',});
  produit.belongsToMany(vente, { through: ligne_vente,foreignKey: 'id_produit', });

  ligne_vente.sync()

module.exports = ligne_vente;

