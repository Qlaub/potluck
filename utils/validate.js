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

async function checkValidationStatus(id) {
  const response = await fetch(`${process.env.SERVER_URL}/api/customers/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id
    })
  });

  let data;
  response.ok ? data = await response.json() : console.log(response.statusText);

  // user is validated
  if (data.message === 'Already validated') {
    return true;
  } // user has not validated their email
  else if (data && !data.message) {
    return data.validation_key;
  } // user cannot be found
  else {
    return false;
  }
}

module.exports = {
  validateCheckout,
  validateEmail,
  checkValidationStatus
}