const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const bcrypt = require('bcrypt');

class Customer extends Model {
  checkPassword(loginPassword) {
      return bcrypt.compareSync(loginPassword, this.password);
  }
}

  Customer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }},
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_donated: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      validated_email: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      validation_key: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, 
    {
      hooks: {
        async beforeCreate(newCustomerData) {
          newCustomerData.password = await bcrypt.hash(newCustomerData.password, 10);
          return newCustomerData;
        },
  
        async beforeUpdate(updatedCustomerData) {
          updatedCustomerData.password = await bcrypt.hash(updatedCustomerData.password, 10);
          return updatedCustomerData;
        } 
      }, 
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'customer',
    }
  );
  
  module.exports = Customer;