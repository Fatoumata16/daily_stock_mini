const { DataTypes } = require("sequelize");
const sequelize=require('../configuration/sequelize_config')
const produit=require('../modeles/produit')
const user=require('../modeles/user')
const appro = sequelize.define('appro', {
    id_appro: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    date_appro: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'appro' ,
    timestamps: false
  });
  appro.belongsTo(user, {
    foreignKey: {
      name: 'id_user', 
      allowNull: false 
    },
    onDelete: 'CASCADE' 
  }),
  // appro.belongsToMany(produit, {
  //   through: 'ligne_appro', // Utilisez le nom de la table de liaison
  //   foreignKey: 'id_appro', // Clé étrangère de l'appro dans la table de liaison
  // });
  appro.sync()
  .then(() => {
    console.log('Le modèle appro a été synchronisé avec la base de données.');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation du modèle User :', error);
  });

module.exports = appro;

