require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// decide what discount will be applied FIRST, use switch
// then make call to stripe to get correct promo code

// expects restaurantBalance and purchasePrice as integers
function calculateDiscount(restaurantBalance, purchasePrice) {
  let id;
  // purchase under $20, 100% discount
  if (restaurantBalance >= purchasePrice && purchasePrice <= 20) {
    id = 'mxamiKmu'
  }

  // purchases over $20, $20 discount
  if (restaurantBalance >= 20 && purchasePrice > 20) {
    id = 'peNTYaG0'
  }

  // purchases over $20, under $20 discount
  if (restaurantBalance < 20) {
    switch (Math.floor(restaurantBalance)) {
      case 19:
        id = 'bgTN721B'
        break;
      case 18:
        id = 'Mheg9pp'
        break;
      case 17:
        id = 'c5Z8Fr42'
        break;
      case 16:
        id = '26pDl3an'
        break;
      case 15:
        id = 'ehMGikIr'
        break;
      case 14:
        id = 'XdPmkVE7'
        break;
      case 13:
        id = 'o7YWdTGM'
        break;
      case 12:
        id = '29qA1EB4'
        break;
      case 11:
        id = 'WQYTpc6X'
        break;
      case 10:
        id = 'rvWRkH3X'
        break;
      case 9:
        id = 'xMPGUjkP'
        break;
      case 8:
        id = 'RPCMOBCx'
        break;
      case 7:
        id = 'K3i1aR3i'
        break;
      case 6:
        id = 'gcgR8Qfi'
        break;
      case 5:
        id = 'vMFGBg3m'
        break;
      case 4:
        id = 'CehRc81c'
        break;
      case 3:
        id = 'h1JXnbHF'
        break;
      case 2:
        id = '1iRPII7O'
        break;
      case 1:
        id = 'L98Magl1'
    }
  }

  return id;
}

async function getPromotionCode(id) {
  const promotionCode = await stripe.promotionCodes.retrieve(id);


};