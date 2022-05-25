const router = require('express').Router();
const { Restaurant } = require('../models');

router.get('/', (req, res) => {
    Restaurant.findAll()
      .then(dbRestaurantData => {
        const restaurants = dbRestaurantData.map(restaurant => restaurant.get({plain: true}));  
        res.render('restaurants', {restaurants,
        loggedIn: req.session.loggedIn});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
