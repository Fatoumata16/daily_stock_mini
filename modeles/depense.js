
const { DataTypes } = require("sequelize");
const sequelize=require('../configuration/sequelize_config')
const user=require('../modeles/user')
const depense = sequelize.define('depense', {
    id_depense: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    libelle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    montant: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    date_depense: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'depense' ,
    timestamps: false
  });
  depense.belongsTo(user, {
    foreignKey: {
      name: 'id_user', 
      allowNull: false 
    },
    onDelete: 'CASCADE' 
  })
  depense.sync()
  

module.exports = depense;