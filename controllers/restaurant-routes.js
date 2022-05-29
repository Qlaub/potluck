const router = require('express').Router();
const { Restaurant, Dish } = require('../models');

// restaurant order page
router.get('/', (req, res) => {
  Restaurant.findAll()
    .then(dbRestaurantData => {
      const restaurants = dbRestaurantData.map(restaurant => restaurant.get({plain: true}));  
      res.render('restaurants', {restaurants,
      loggedIn: req.session.loggedIn});
    })
    .catch(err => { 
      console.log(err);
      res.status(500).json(err);
    });
});

// restaurant menu page
router.get('/:id', (req, res) => {
  Dish.findAll({
    where: {restaurant_Id: req.params.id},
    attributes: { exclude: ['restaurant_id'] },
    include: [
      {
        model: Restaurant,
        attributes: ['name']
      }
    ]
  })
  .then(dbDishData => {
    const dishes = dbDishData.map(dish => dish.get({plain: true}));
    console.log(dishes);
    const dishesInDollars = dishes.forEach(dish => {
      dish.price_in_cents = dish.price_in_cents/100
    })
    console.log(dishesInDollars)
    const restaurantName = dishes[0].restaurant.name;
    // console.log({dishes: dishes, restaurantName: restaurantName, loggedIn: req.session.loggedIn})
    res.render('menu', {dishes: dishes, restaurantName: restaurantName, loggedIn: req.session.loggedIn})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
