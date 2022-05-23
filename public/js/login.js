// dom elements will go here

// hardcoded until html and css are finished
// signup pathway for new users
let signupOption = async event => {
    const username = "Sonny";
    const email = "sonny@yesmail.com";
    const password = "sonny1";

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
    const email = "sonny@yesmail.com";
    const password = "sonny1"
  
    if (email && password) {
      const response = await fetch('/api/customers/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      response.ok ? document.location.replace('/') : /* replace this path with the one that will be used after log-in */
      alert(response.statusText); }
    }