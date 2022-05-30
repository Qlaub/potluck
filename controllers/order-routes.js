require('dotenv').config();
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const {updateRestaurantBalance, updateCustomerDonationBalance} = require('../utils/routeHelper');

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
    loggedIn: req.session.loggedIn
  }

  // RENDER BELOW WITH HANDLEBARS
  res.render('donationSuccess', renderData);
});

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

  // PROBABLY NEED A RENDER BELOW TO WORK WITH HANDLEBARS
  res.send(`<html><body><h1>Thanks for your $${purchaseAmount} order, ${customer.name}!</h1></body></html>`);
});

module.exports = router;