const router = require('express').Router();
const {Restaurant, Dish} = require('../models/');
const fetch = require('node-fetch');
const { prepareVerificationEmail, sendEmail } = require('../utils/mailer');
require('dotenv').config();

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

// email verification screen
router.get('/verify/:id', async (req, res) => {
  const response = await fetch(`${process.env.SERVER_URL}/api/customers/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: req.params.id})
  });

  let data;
  response.ok ? data = await response.json() : console.log(response.statusText);

  // data is present, the customer id matches the session id, and the email isn't validated
  if (data) {
    // user already has their email validated
    if (data.message === 'Already validated') {
      res.redirect('/');
      return;
    } else if (data.id === req.session.customer_id && !data.validated_email) {
      // user has correct id and doesn't have a validated email
      // prepare email info
      const verificationLink = `${process.env.SERVER_URL}/verify/${data.validation_key}`
      const email = prepareVerificationEmail(data.validation_key, verificationLink);
      // sendEmail expects data.email as an email address string, and email as an object with a subject and text
      sendEmail(data.email, email);
      res.render('emailValidate');
      return;
    }
    //user potentially entered the verification key as a part of the href
  } else {
    const response = await fetch(`${process.env.SERVER_URL}/api/customers/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({code: req.params.id})
    });
  
    let data;
    response.ok ? data = await response.json() : console.log(response.statusText);

    if (data && !data.validated_email) {
      res.render('emailValidate');
      return;
      // user has mistakenly tried to go to the verification url, redirected
    } else {
      res.redirect('/')
      return;
    }
  }
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
