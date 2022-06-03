const buttonEl = document.querySelector('#donateBtn');
const donationFormEl = document.querySelector('#donateForm');
const restaurantSelectionEl = document.querySelector('#restaurant');
const radioButtonEls = document.querySelectorAll('input[type="radio"]');

// Amount argument expected as an integer in pennies
async function donate(restaurantId, amount, restaurantName) {
  // post request to credit card checkout
  const response = await fetch('/api/checkout/donate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      restaurantId: restaurantId,
      amount: amount,
      name: restaurantName,
    })
  });

  let data;
  response.ok ? data = await response.json() : alert(response.statusText);

  if (data.redirect) {
    window.location.href = `${data.redirect}`;
  } else {
    // Update page to credit card checkout url
    window.location = data.url;
  }

  return true;
};

function getUserValue() {
  const customDonationEl = document.querySelector('#customAmount');
  const customDonation = customDonationEl.value.trim();
  let value;

  radioButtonEls.forEach(button => {
    // validate custom donation
    if (button.dataset.amount === "custom" && button.checked) {
      console.log(button)
      value = customDonation;
    } else if (button.checked) {
      value = button.dataset.amount;
      console.log(button.value)
    }
  });

  // validate
  if (!value || !Number.isInteger(parseInt(value))) {
    customDonationEl.classList.add('placeholder-red-500');
    customDonationEl.value = '';
    customDonationEl.placeholder = 'Please click on or enter a valid donation amount';
    
    return false;
  }

  return value;
}

donationFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const restaurantName = restaurantSelectionEl.options[restaurantSelectionEl.selectedIndex].text;
  // NEED INPUT VALIDATION
  let amount = getUserValue() * 100; // Stripe expects amount in pennies

  if (amount) {
    donate(restaurantSelectionEl.value, amount, restaurantName);
  }
});


// document.querySelector('#testValidate').addEventListener('click', async (event)=> {
//   event.preventDefault();

//     const response = await fetch('/api/customers/validate', {
//       method: 'GET'
//     });

//     let data;
//     response.ok ? data = await response.json() : console.log(response.statusText);

//     console.log(data);
// })