// dom elements will go here
const signUpUsernameEl = document.querySelector('#signUpUsername');
const signUpEmailEl = document.querySelector('#signUpEmail');
const signUpPasswordEl = document.querySelector('#signUpUsername');
const loginEmailEl = document.querySelector('#loginEmail');
const loginPasswordEl = document.querySelector('#loginPassword');
const signUpBtnEl = document.querySelector('#signUpBtn');
const loginBtnEl = document.querySelector('#loginBtn');

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
  
      response.ok ?
      console.log("User has successfully been created") :
      alert(response.statusText);
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

      response.ok ? console.log('you logged in') : console.log('problem');

      response.ok ? document.location.replace('/') : /* replace this path with the one that will be used after log-in */
      alert(response.statusText); }
    }

loginBtnEl.addEventListener('click', loginOption);

signUpBtnEl.addEventListener('click', signupOption);