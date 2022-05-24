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

  for (let i=0; i < dishes.length; i++) {
    dishes[i].quantity = quantities[i];
  }

  console.log(dishes);

  return dishes;
};

async function checkout(dishes) {
  fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: dishes
    })
  }).then(res => {
    if (res.ok) return res.json()
    return res.json().then(json => Promise.reject(json))
  }).then(({ url }) => {
    window.location = url;
  }).catch(err => {
    console.log(err)
  });
}

button.addEventListener('click', async () => {
  const dishes = await getDishes(testIds, quantities);
  const pay = await checkout(dishes);
});

const testIds = [1,2,3];
const quantities = [2, 2, 2];