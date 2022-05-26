const router = require('express').Router();
const {Restaurant, Dish} = require('../models/');

// homepage
router.get('/', (req, res) => {
  res.render('homepage');
});

// about
router.get('/about', (req, res) => {
  res.render('about');
});

// donate
router.get('/donate', (req, res) => {
  Restaurant.findAll({
    include: [
      {
        model: Dish,
        attributes: ['id', 'price_in_cents', 'name']
      }
    ]
  })
    .then(dbRestaurantData => {
      const restaurantData = dbRestaurantData.map(data => data.get({ plain: true }));

      res.render('donate', {restaurants: restaurantData})})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// order
router.get('/order', (req, res) => {

  res.render('order');
});

//checks if a user is already logged in
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) { 
      res.redirect('/');
      return;
    }
    res.render('signup');
});

//checks if a user is already logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) { 
      res.redirect('/');
      return;
    }
    res.render('about');
});

module.exports = router;
