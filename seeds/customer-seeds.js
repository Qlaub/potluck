const {Customer} = require('../models');

const customerData = [
    {
        username: 'Philitup',
        email: 'phil@yesmail.com',
        password: 'philabc',
        total_donated: 0,
        validated_email: 1
    },
    {
        username: 'Jillian252',
        email: 'jillian@aol.com',
        password: 'jilljill12',
        total_donated: 0,
        validated_email: 1
    },
    {
        username: 'AquaLina',
        email: 'alina@gmail.com',
        password: 'alina2',
        total_donated: 0,
        validated_email: 1
    },
    {
        username: 'Forestdoor2000',
        email: 'forest@ymail.com',
        password: 'runForest1',
        total_donated: 0,
        validated_email: 1
    },
    {
        username: 'FreyaCloud',
        email: 'freya@aol.com',
        password: 'freyashield1',
        total_donated: 0,
        validated_email: 1
    }
];

const customersSeed = () => Customer.bulkCreate(customerData, {individualHooks: true});

module.exports = customersSeed;