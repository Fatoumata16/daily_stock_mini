const { DataTypes } = require("sequelize");
const sequelize=require('../configuration/sequelize_config')
const user=require('../modeles/user')
const vente = sequelize.define('vente', {
    id_vente: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    date_vente: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'vente' ,
    timestamps: false
  });
  vente.belongsTo(user, {
    foreignKey: {
      name: 'id_user', 
      allowNull: false 
    },
    onDelete: 'CASCADE' 
  })
  vente.sync()
  .then(() => {
    console.log('Le modèle vente a été synchronisé avec la base de données.');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation du modèle User :', error);
  });
module.exports = vente;

