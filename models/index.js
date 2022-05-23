
const Customer = require('./Customer');
const Restaurant = require('./Restaurant');
const Badge = require('./Badge');
const Dish = require('./Dish');
const Restaurant = require('./Restaurant');

/*
Uncomment when a model relationship can be added
Customer.hasMany(Badge, {
    foreignKey: 'customer_id'
  });

Badge.belongsTo(Customer, {
    foreignKey: 'customer_id'
  });
*/

Dish.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id'
});

Restaurant.hasMany(Dish, {
  foreignKey: 'restaurant_id'
});

module.exports = {Customer, Badge, Dish, Restaurant};
