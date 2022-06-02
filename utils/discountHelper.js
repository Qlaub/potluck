require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// expects restaurantBalance and purchasePrice as integers
async function getCoupon(restaurantBalance, purchasePrice) {
  let coupon;
  // purchases of $20 and under, 100% discount
  if (purchasePrice <= 20 && restaurantBalance >= purchasePrice) {
    coupon = await stripe.coupons.create({
      percent_off: 100.00,
      duration: 'once',
    });
  } // purchases of over $20, $20 discount
  else if (purchasePrice > 20 && restaurantBalance >= 20) {
    coupon = await stripe.coupons.create({
      amount_off: 2000,
      duration: 'once',
      currency: 'usd'
    });
  } // purchases of $20 and over, under $20 discount
  else if (purchasePrice >= 20 && restaurantBalance < 20) {
    coupon = await stripe.coupons.create({
      // convert restaurantBalance to pennies
      amount_off: restaurantBalance * 100,
      duration: 'once',
      currency: 'usd'
    });
  } // purchases under $20, under $20 discount
  else {
    coupon = await stripe.coupons.create({
      amount_off: restaurantBalance * 100,
      duration: 'once',
      currency: 'usd'
    });
  }

  return coupon;
}

// returns a coupon object if applicable, returns undefined if no coupon is applicable
 async function checkForCoupon (restaurantBalance, data) {
  if (restaurantBalance) {
    //purchaseTotal will be in dollars
    let purchaseTotal = 0;
    data.forEach(dish => {
      purchaseTotal += dish.price_in_cents / 100 * dish.amount
    });

    const coupon = await getCoupon(restaurantBalance, purchaseTotal);

    return coupon;
  }
}

module.exports = {
  checkForCoupon
};