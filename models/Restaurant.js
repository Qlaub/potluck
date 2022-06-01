const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Restaurant extends Model {}

  Restaurant.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      address1: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address2: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, 
    { 
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'restaurant',
    }
  );
  
  module.exports = Restaurant;
