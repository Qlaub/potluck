const router = require('express').Router();
const customerRoutes = require('./customer-routes');
const restaurantRoutes = require('./restaurant-routes');

router.use('/customers', customerRoutes);
router.use('/restaurants', restaurantRoutes);

module.exports = router;