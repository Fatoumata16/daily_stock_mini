// ligne_appro.js

const { DataTypes } = require("sequelize");
const sequelize = require('../configuration/sequelize_config');

const produit = require('../modeles/produit');
const appro = require('../modeles/appro');

const ligne_appro = sequelize.define('ligne_appro', {
  quantite: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
}, {
  tableName: 'ligne_appro',
  timestamps: false
});
appro.belongsToMany(produit, { through: ligne_appro, foreignKey: 'id_appro' });
produit.belongsToMany(appro, { through: ligne_appro, foreignKey: 'id_produit' });


ligne_appro.sync()

module.exports = ligne_appro;
