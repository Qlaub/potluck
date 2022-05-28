const router = require('express').Router();
const {Restaurant, Dish} = require('../models/');

// homepage
router.get('/', (req, res) => {
  res.render('homepage', {loggedIn: req.session.loggedIn});
});

// about
router.get('/about', (req, res) => {
  res.render('about', {loggedIn: req.session.loggedIn});
});

// donate
router.get('/donate', (req, res) => {
  // checks if user is logged in
  if (!req.session.loggedIn) {
    // res.render used instead of redirect because it allows passing a custom message
    res.render('login', {message: 'Please log in to donate!'});
    return;
  }

  Restaurant.findAll({
    include: [
      {
        model: Dish,
        attributes: ['id', 'price_in_cents', 'name']
      }
    ],
  })
    .then(dbRestaurantData => {
      const restaurantData = dbRestaurantData.map(data => data.get({ plain: true }));

      res.render('donate', {restaurants: restaurantData, loggedIn: req.session.loggedIn})})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// order
router.get('/order', (req, res) => {
  // checks if user is logged in
  if (!req.session.loggedIn) {
    // res.render used instead of redirect because it allows passing a custom message
    res.render('login', {message: 'Please log in to order!'});
    return;
  }

  res.render('order', {loggedIn: req.session.loggedIn});
});

//checks if a user is already logged in
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) { 
      res.redirect('/');
      return;
    }
    res.render('signup', {loggedIn: req.session.loggedIn});
});

//checks if a user is already logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) { 
      res.redirect('/');
      return;
    }
    res.render('login', {loggedIn: req.session.loggedIn});
});

module.exports = router;
