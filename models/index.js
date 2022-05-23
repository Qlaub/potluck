
const Customer = require('./Customer');
const Restaurant = require('./Restaurant');
const Badge = require('./Badge');

Customer.hasMany(Badge, {
    foreignKey: 'customer_id'
  });

Badge.belongsTo(Customer, {
    foreignKey: 'customer_id'
  });

module.exports = {Customer, Restaurant, Badge};
