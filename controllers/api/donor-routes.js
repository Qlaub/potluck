const router = require('express').Router();
const {Donor} = require('../../models');

router.get('/', (req, res) => {
    Donor.findAll({
        attributes: { exlude: ['password'] }
    })
    .then(dbDonorData => res.json(dbDonorData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;