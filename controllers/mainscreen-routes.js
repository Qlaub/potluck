const router = require('express').Router();
const {Restaurant, Dish} = require('../models/');

// homepage
router.get('/', (req, res) => {
  res.render('homepage', {session: req.session});
});

// about
router.get('/about', (req, res) => {
  res.render('about', {session: req.session});
});

// donate
router.get('/donate', (req, res) => {
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

      res.render('donate', {restaurants: restaurantData, session: req.session})})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });


router.get('/menu', (req, res) => {

  res.redirect('/order');
}); 

//checks if a user is already logged in
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) { 
      res.redirect('/');
      return;
    }
    res.render('signup', {session: req.session});
});

//checks if a user is already logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) { 
      res.redirect('/');
      return;
    }
    res.render('login', {session: req.session, loginPage: true});
});

module.exports = router;
