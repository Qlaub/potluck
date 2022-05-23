const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Restaurant extends Model {}

  Restaurant.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      restaurant_balance: {
        type: DataTypes.INTEGER,
        allowNull: true
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