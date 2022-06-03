async function verify (event) {
  event.preventDefault();
  let id = window.location.href.split('/');
  id = id[id.length - 1]

  const userInput = document.querySelector('#verificationInput').value;

  const response = await fetch(`/api/customers/validate`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      userInput: userInput
    })
  });

  let data;
  response.ok ? data = await response.json() : alert(response.statusText);

  console.log(data.href)

  window.location.href = `${data.href}`
}

document.querySelector('#verificationBtn').addEventListener('click', verify);