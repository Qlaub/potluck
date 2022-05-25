
let $main = document.querySelector('main');

let chosenRestaurant = async event => {
    let restaurant = event.target;
    let restaurantId = Number(restaurant.id);
    
    const response = await fetch('/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: restaurantId
      })
    });

    response.ok ? 
    document.location.replace('/menu') :
    console.log('response not okay');

    // response.ok ?
    // document.location.replace('/menu') :
    // alert(response.statusText);
  }; 


$main.addEventListener('click', chosenRestaurant);

