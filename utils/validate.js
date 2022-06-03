const fetch = require('node-fetch');
require('dotenv').config();

function validateCheckout(values, dishData, id) {
  let check = true;

  if (values.length != dishData.length) {
    check = false;
  }

  dishData.forEach(dish => {
    if (dish.restaurant_id != id) {
      check = false;
    }
  })

  return check;
}

async function validateEmail(urlId, inputValues) {
  let response = await fetch(`${process.env.SERVER_URL}/api/customers/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: urlId
    })
  });

  let data;
  if (response.ok) {
    data = await response.json();
  } else {
    let response = await fetch(`${process.env.SERVER_URL}/api/customers/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: urlId
      })
    });

    if (response.ok) {
      data = await response.json();
    } else {
      return false;
    }
  }

  if (data.validation_key == inputValues) {
    return data;
  }
}

module.exports = {
  validateCheckout,
  validateEmail
}