const router = require('express').Router();
const { Restaurant, Dish } = require('../models');

// restaurant order page
router.get('/', (req, res) => {
  Restaurant.findAll()
    .then(dbRestaurantData => {
      const restaurants = dbRestaurantData.map(restaurant => restaurant.get({plain: true}));
      res.render('restaurants', {restaurants,
      session: req.session});
    })
    .catch(err => { 
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
