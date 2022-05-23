const sequelize = require('../config/config');
const customersSeed = require('./customer-seeds');
//const restaurantsSeed = require('./restaurant-seeds'); Uncomment once restaurant table is finished.

const seedsSync = async () => {
    await sequelize.sync({force: true});

    await customersSeed();
    console.log('The Customer table seeding has been pre-populated!');

    //await restaurantsSeed();
    //console.log('The Restaurant table seeding has been pre-populated!');

    process.exit(0);
};

seedsSync();