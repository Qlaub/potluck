// dom elements will go here
const signUpUsernameEl = document.querySelector('#signUpUsername');
const signUpEmailEl = document.querySelector('#signUpEmail');
const signUpPasswordEl = document.querySelector('#password');
const loginEmailEl = document.querySelector('#loginEmail');
const loginPasswordEl = document.querySelector('#loginPassword');
const signUpBtnEl = document.querySelector('#signUpBtn');
const loginBtnEl = document.querySelector('#loginBtn');
const signInFormEl = document.querySelector('#signInForm');

// Removed hardcoded values and added dom elements
// signup pathway for new users
let signupOption = async event => {
  event.preventDefault();
    const username = signUpUsernameEl.value.trim();
    const email = signUpEmailEl.value.trim();
    const password = signUpPasswordEl.value.trim();

    console.log(username, email, password);

    if (username && email && password) {
      const response = await fetch('/api/customers', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      let data;
      response.ok ?
      // window.location.href = '/' :
      data = await response.json() :
      alert(response.statusText);

      if (data.id) {
        window.location.href = `/verify/${data.id}`;
      }
    }
  }
  
// login pathway for existing users
let loginOption = async event => {
  event.preventDefault();
  const email = loginEmailEl.value.trim();
  const password = loginPasswordEl.value.trim();

  if (email && password) {
    const response = await fetch('/api/customers/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    response.ok ? document.location.replace('/about') : 
    alert(response.statusText); }
  }

loginBtnEl.addEventListener('click', loginOption);

signUpBtnEl.addEventListener('click', signupOption);