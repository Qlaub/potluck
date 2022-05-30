// node-fetch is an ESM-only module
const fetch = require('node-fetch');
require('dotenv').config();

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

  response.ok ? await response.json() : console.log(response.statusText);

  return;
};

async function updateCustomerDonationBalance(customerId, amount) {
  const response = await fetch(`${process.env.SERVER_URL}/api/customers/donation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({amount: amount, customerId: customerId})
  });

  response.ok ? await response.json() : console.log(response.statusText);

  return;
};

async function retrieveDishData(restaurantId) {
  const response = await fetch(`${process.env.SERVER_URL}/api/restaurants/dishes/${restaurantId}`, {
    method: 'GET',
  });

  let dishes;
  response.ok ? dishes = await response.json() : console.log(response.statusText);
  
  return dishes;
};

function sanitizeValues(values) {
  let newValues = [];

  values.forEach(value => {
    if (value < 11 && value > 0) {
      newValues.push(value)
    } else {
      newValues.push(0)
    }
  });

  return newValues;
};

function prepareData(userValues, dishData) {
  let preparedData = [];

  userValues.forEach((value, index) => {
    if (value) {
      dishData[index].amount = value;
      preparedData.push(dishData[index]);
    }
  });
  
  return preparedData;
};

async function retrieveRestaurantBalance(restaurantId) {
  const response = await fetch(`${process.env.SERVER_URL}/api/restaurants/balance/${restaurantId}`, {
    method: 'GET',
  });

  let balance;
  response.ok ? balance = await response.json() : console.log(response.statusText);
  
  return balance.balance;
};

module.exports = {
  dishIds, 
  updateRestaurantBalance, 
  updateCustomerDonationBalance, 
  retrieveDishData,
  sanitizeValues,
  prepareData,
  retrieveRestaurantBalance
};