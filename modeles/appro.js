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
  
  appro.sync()

module.exports = appro;

