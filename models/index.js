
const Donor = require('./Donor');
const Badge = require('./Badge');

/*
Uncomment when a model relationship can be added
Donor.hasMany(Badge, {
    foreignKey: 'donor_id'
  });

Badge.belongsTo(Donor, {
    foreignKey: 'donor_id'
  });
*/

module.exports = {Donor, Badge};
