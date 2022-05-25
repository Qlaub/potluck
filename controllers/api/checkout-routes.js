require('dotenv').config();
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
      metadata: {
        "amount": JSON.stringify(req.body.amount),
        "restaurantId": JSON.stringify(req.body.restaurantId)
      },
      // UPDATE URL BELOW
      success_url: `${process.env.SERVER_URL}/order/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      // UPDATE URL BELOW
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
      // metadata needed to pass value of test donations
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
      metadata: {
        "items": JSON.stringify(req.body.items.map(item => {
          return {
            amount: item.price_in_cents,
            quantity: item.quantity,
            restaurant_id: item.restaurant_id
          }
        }))
      },
      // UPDATE URL BELOW
      success_url: `${process.env.SERVER_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      // UPDATE URL BELOW
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    })
    // returns a url to a stripe checkout page
    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  };
});

module.exports = router;