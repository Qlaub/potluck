// node-fetch is an ESM-only module
const fetch = require('node-fetch');

// Expects ids as an array of integers
// Returns array of objects, each has an id key associated with a dish
function dishIds(ids) {
  let dishIds = [];
  ids.forEach(id => {
    dishIds.push({id: id})
  });

  return dishIds;
};

async function updateRestaurantBalance(restaurantId, amount) {  
  const response = await fetch(`${process.env.SERVER_URL}/api/restaurants/${restaurantId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({amount: amount})
  });

  response.ok ? await response.json() : alert(response.statusText);

  return;
};

async function updateCustomerDonationBalance(amount, customerId) {
  console.log(amount);
  const response = await fetch(`${process.env.SERVER_URL}/api/customers/donation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({amount: amount, customerId: customerId})
  });

  response.ok ? await response.json() : console.log(response.statusText);

  return;
}

module.exports = {dishIds, updateRestaurantBalance, updateCustomerDonationBalance};