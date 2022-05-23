const {Restaurant} = require('../models');

const restaurantData = [
    {
        name: 'Chili\'s',
        meals: ['example1', 'example2', 'example3', 'example4'],
        balance: 0
    },
    {
        name: 'Red Lobster',
        meals: ['example1', 'example2', 'example3', 'example4'],
        balance: 0
    },
    {
        name: 'Chipotle',
        meals: ['example1', 'example2', 'example3', 'example4'],
        balance: 0
    },
    {
        name: 'Olive Garden',
        meals: ['example1', 'example2', 'example3', 'example4'],
        balance: 0
    },
    {
        name: 'Farmside Kitchen',
        meals: ['example1', 'example2', 'example3', 'example4'],
        balance: 0
    },
    {
        name: 'The Goat Durham',
        meals: ['example1', 'example2', 'example3', 'example4'],
        balance: 0
    }
];

const restaurantsSeed = () => Restaurant.bulkCreate(restaurantData, {individualHooks: true});

module.exports = restaurantsSeed;