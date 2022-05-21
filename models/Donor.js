const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const bcrypt = require('bcrypt');

class Donor extends Model {
    checkPassword(loginPassword) {
      return bcrypt.compareSync(loginPassword, this.password);
    }
  }
  
  Donor.init(
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
        validate: {
          len: [4]
        }
      },
      balance: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      /*badges: {
          type: DataTypes.ARRAY,
          allowNull: true,      May not need badge as a direct property of Donor. 
                                Multiple badges can have multiple donors and donors can have multiple badges
      } */
      hooks: {
        async beforeCreate(newDonorData) {
          newDonorData.password = await bcrypt.hash(newDonorData.password, 10);
          return newDonorData;
        },
  
        async beforeUpdate(updatedDonorData) {
          updatedDonorData.password = await bcrypt.hash(updatedDonorData.password, 10);
          return updatedDonorData;
        }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'donor'
    }
  );
  
  module.exports = Donor;