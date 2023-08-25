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
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      
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
module.exports = vente;

