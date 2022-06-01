require('dotenv').config();
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const {updateRestaurantBalance, updateCustomerDonationBalance} = require('../utils/routeHelper');
const { Restaurant } = require('../models');

// order
router.get('/', (req, res) => {
  // checks if user is logged in
  if (!req.session.loggedIn) {
    // res.render used instead of redirect because it allows passing a custom message
    res.render('login', {message: 'Please log in to order!'});
    return;
  }

  Restaurant.findAll()
    .then(dbRestaurantData => {
      const restaurants = dbRestaurantData.map(restaurant => restaurant.get({plain: true}));
      res.render('order', {restaurants: restaurants, session: req.session});
    })
    .catch(err => { 
      console.log(err);
      res.status(500).json(err);
    });
});

// completed donation
router.get('/donation-success', async (req, res) => {
  // checks if user is logged in
  if (!req.session.loggedIn) {
    // res.render used instead of redirect because it allows passing a custom message
    res.render('login', {message: 'Please log in to donate!'});
    return;
  }

  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  // donationAmount divided by 100 because amount is converted from pennies to dollars
  const donationAmount = JSON.parse(session.metadata.amount) / 100;
  const restaurantId = JSON.parse(session.metadata.restaurantId);
  const restaurantName = JSON.parse(session.metadata.name)

  updateRestaurantBalance(restaurantId, donationAmount);

  updateCustomerDonationBalance(req.session.customer_id, donationAmount);

  const renderData = {
    restaurant: {
      name: restaurantName,
      amount: donationAmount
    },
    checkout: 'donation',
    session: req.session
  }

  // RENDER BELOW WITH HANDLEBARS
  res.render('success', renderData);
});


// completed purchase
router.get('/success', async (req, res) => {
  // checks if user is logged in
  if (!req.session.loggedIn) {
    // res.render used instead of redirect because it allows passing a custom message
    res.render('login', {message: 'Please log in to order!'});
    return;
  }

  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  // Tally the purchase total
  let purchaseAmount = 0;
  const items = JSON.parse(session.metadata.items);
  items.forEach(item => {
    // divide by 100 because converting from pennies to dollars
    purchaseAmount += item.amount*item.quantity/100
  });

  const restaurantId = items[0].restaurant_id;

  const renderData = {
    restaurant: {
      name: items[0].restaurant_name,
      amount: purchaseAmount
    },
    checkout: 'order',
    session: req.session
  }

  if (session.total_details.amount_discount) {
    const amount = -Math.abs(session.total_details.amount_discount/100);
    updateRestaurantBalance(restaurantId, amount);
    renderData.discount = session.total_details.amount_discount/100;
  }

  // PROBABLY NEED A RENDER BELOW TO WORK WITH HANDLEBARS
  res.render(`success`, renderData);
});

module.exports = router;