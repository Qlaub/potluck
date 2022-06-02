function validateCheckout(values, dishData, id) {
  let check = true;

  if (values.length != dishData.length) {
    check = false;
  }

  dishData.forEach(dish => {
    if (dish.restaurant_id != id) {
      check = false;
    }
  })

  return check;
}

module.exports = {
  validateCheckout
}