const button = document.querySelector('#checkoutBtn');

async function getDishes(ids, quantities) {  
  const response = await fetch('/api/restaurants/dishes/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ids: ids})
  });

  let dishes;
  response.ok ? dishes = await response.json() : alert(response.statusText);

  // Update dishes with quantities
  for (let i=0; i < dishes.length; i++) {
    dishes[i].quantity = quantities[i];
  };

  return dishes;
};

async function checkout(dishes) {
  // post request to credit card checkout
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: dishes
    })
  });

  let data;
  response.ok ? data = await response.json() : alert(response.statusText);

  // Update page to credit card checkout url
  window.location = data.url;

  return true;
};

button.addEventListener('click', async () => {
  const dishes = await getDishes(testIds, testQuantities);
  console.log(dishes)
  checkout(dishes);
});

// hardcoded values for testing purposes
const testIds = [1, 2, 3];
const testQuantities = [2, 2, 2];