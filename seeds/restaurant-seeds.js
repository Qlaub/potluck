const {Restaurant} = require('../models');

const restaurantData = [
    {
        id: 1,
        name: 'Chili\'s',
        balance: 0,
        address1: '4600 Chapel Hill Blvd.',
        address2: 'Durham, NC 27707',
        phone: '(919) 489-6699'
    },
    {
        id: 2,
        name: 'Red Lobster',
        balance: 0,
        address1: '4416 Chapel Hill Blvd.',
        address2: 'Durham, NC 27707',
        phone: '(919) 493-3566'
    },
    {
        id: 3,
        name: 'Chipotle',
        balance: 0,
        address1: '3800 N Roxboro St.',
        address2: 'Durham, NC 27704',
        phone: '(919) 471-1662'
    },
    {
        id: 4,
        name: 'Littler',
        balance: 0,
        address1: '110 E Parrish St.',
        address2: 'Durham, NC 27701',
        phone: '(984) 219-2739'
    },
    {
        id: 5,
        name: 'Farmside Kitchen',
        balance: 0,
        address1: '5431 Page Rd.',
        address2: 'Durham, NC 27703',
        phone: '(984) 219-2739'
    },
    {
        id: 6,
        name: 'The Goat Durham',
        balance: 0,
        address1: '5600 Primary Dr.',
        address2: 'Durham, NC 27560',
        phone: '(919) 981-9405'
    }
];

const restaurantsSeed = () => Restaurant.bulkCreate(restaurantData, {individualHooks: true});

module.exports = restaurantsSeed;
