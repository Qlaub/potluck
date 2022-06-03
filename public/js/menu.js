const orderBtnEl = document.querySelector('#orderBtn');
const inputEls = document.querySelectorAll('input');

async function checkout (event) {
  event.preventDefault();

  let userValues = []
  inputEls.forEach(el => {
    userValues.push(el.value)
  });

  const id = window.location.pathname.split('/').slice(-1)[0]

  const response = await fetch(`/api/checkout/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: userValues
    })
  });

  let data;
  response.ok ? data = await response.json() : alert(response.statusText);

  if (data.redirect) {
    window.location.pathname = `${data.redirect}`
  } else {
    // Update page to credit card checkout url
    window.location = data.url;
  }

  return true;
}

orderBtnEl.addEventListener('click', checkout);