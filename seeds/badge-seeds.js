const {Badge} = require('../models');

const badgeData = [
    {
        badge_name: 'Saint',
        badge_image: 'badgeImagePath',
        customer_id: '1'
    },
    {
        badge_name: 'Tycoon with Wings',
        badge_image: 'badgeImagePath',
        customer_id: '1'
    },
];

const badgesSeed = () => Badge.bulkCreate(badgeData, {individualHooks: true});

module.exports = badgesSeed;