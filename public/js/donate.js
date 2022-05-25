const button = document.querySelector('#donateBtn');
const donationFieldEl = document.querySelector('#donateInput')

// Amount argument expected as an integer in pennies
async function donate(amount) {
  // post request to credit card checkout
  const response = await fetch('/api/checkout/donate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amount
    })
  });

  let data;
  response.ok ? data = await response.json() : alert(response.statusText);

  // Update page to credit card checkout url
  window.location = data.url;

  return true;
};

button.addEventListener('click', (e) => {
  e.preventDefault();

  // NEED INPUT VALIDATION
  let amount = donationFieldEl.value * 100 // Stripe expects amount in pennies
  donate(amount);
});