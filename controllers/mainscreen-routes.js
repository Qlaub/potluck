const router = require('express').Router();

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
  res.render('donate');
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
    res.render('login');
});

module.exports = router;
