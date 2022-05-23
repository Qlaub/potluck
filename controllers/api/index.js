const router = require('express').Router();
const customerRoutes = require('./customer-routes');
const restaurantRoutes = require('./restaurant-routes');
const checkoutRoutes = require('./checkout-routes');

router.use('/customers', customerRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/checkout', checkoutRoutes);

module.exports = router;