
const { DataTypes } = require("sequelize");
const sequelize=require('../configuration/sequelize_config')

const user = sequelize.define('user', {
    id_user: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    pass: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nom_boutique: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
     
    },
    type_boutique: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique:true
      }
  }, {
    tableName: 'user' ,
    timestamps: false
  });

  user.sync()
  .then(() => {
    console.log('Le modèle User a été synchronisé avec la base de données.');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation du modèle User :', error);
  });

module.exports = user;