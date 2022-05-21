const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Badge extends Model {}

Badge.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    badge_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    badge_image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    donor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'donor',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'badge'
  }
);

module.exports = Badge;
