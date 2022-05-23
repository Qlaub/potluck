
const Customer = require('./Customer');
//const Restaurant = require('./Restaurant');
const Badge = require('./Badge');

/*
Uncomment when a model relationship can be added
Customer.hasMany(Badge, {
    foreignKey: 'customer_id'
  });

Badge.belongsTo(Customer, {
    foreignKey: 'customer_id'
  });
*/

module.exports = {Customer, Badge};
