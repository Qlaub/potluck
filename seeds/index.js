const sequelize = require('../config/config');
const customersSeed = require('./customer-seeds');
const restaurantsSeed = require('./restaurant-seeds'); 
const badgesSeed = require('./badge-seeds');
const dishesSeed = require('./dish-seeds');

const seedsSync = async () => {
    await customersSeed();
    console.log('The Customer table seeding has been pre-populated!');

    await badgesSeed();
    console.log('The Badge table seeding has been pre-populated!');

    await restaurantsSeed();
    console.log('The Restaurant table seeding has been pre-populated!'); 

    await dishesSeed();
    console.log('The Dish table seeding has been pre-populated!');
};

module.exports = seedsSync;