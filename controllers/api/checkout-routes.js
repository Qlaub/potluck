require('dotenv').config();
// UPDATE process.env FILE WITH PUBLIC KEY FOR DEPLOYMENT
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const router = require('express').Router();

// Donation route
// Stripe expects req.body to include donation amount in pennies (lol) ex: { amount: 10000 } for $100 donation
router.post('/donate', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Donation'
          },
          unit_amount: req.body.amount
        },
        quantity: 1
      }],
      // UPDATE URL BELOW
      success_url: `${process.env.SERVER_URL}/success.html`,
      // UPDATE URL BELOW
      cancel_url: `${process.env.SERVER_URL}/cancel.html`
    })
    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  };
});

// Meal checkout route
router.post('/', async (req, res) => {
  try {
    // start checkout process
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      // checkout items expected as an array of objects
      line_items: req.body.items.map(item => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name
            },
            unit_amount: item.price_in_cents
          },
          quantity: item.quantity
        }
      }),
      // UPDATE URL BELOW
      success_url: `${process.env.SERVER_URL}/success.html`,
      // UPDATE URL BELOW
      cancel_url: `${process.env.SERVER_URL}/cancel.html`
    })
    // returns a url to a stripe checkout page
    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  };
});

module.exports = router;