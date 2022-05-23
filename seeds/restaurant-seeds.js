const {Restaurant} = require('../models');

const restaurantData = [
    {
        name: 'Chili\'s',
        balance: 0
    },
    {
        name: 'Red Lobster',
        balance: 0
    },
    {
        name: 'Chipotle',
        balance: 0
    },
    {
        name: 'Olive Garden',
        balance: 0
    },
    {
        name: 'Farmside Kitchen',
        balance: 0
    },
    {
        name: 'The Goat Durham',
        balance: 0
    }
];

const restaurantsSeed = () => Restaurant.bulkCreate(restaurantData, {individualHooks: true});

module.exports = restaurantsSeed;
