const router = require('express').Router();
const { Dish, Restaurant } = require('../../models');
const { Op } = require('sequelize');
const dishIds = require('../../utils/routeHelper');

// Get all restaurants
router.get('/', (req, res) => {
  Restaurant.findAll()
    .then(dbRestaurantData => res.json(dbRestaurantData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get one restaurant
router.get('/:id', (req, res) => {
  Restaurant.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbRestaurantData => {
      if(!dbRestaurantData) {
        res.status(404).json({ message: 'No restaurant found with this id' });
        return;
      }
      res.json(dbRestaurantData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new menu item
router.post('/dishes', (req, res) => {
  Dish.create({
    price_in_cents: req.body.price_in_cents,
    name: req.body.name
  })
    .then(dbDishData => res.json(dbDishData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Find all menu items with matching ID values
// expects request with json body as { ids: [1, 2, 3, 4, etc...] } - each integer being the id of a particular dish selected for checkout
router.get('/dishes/', (req, res) => {
  Dish.findAll({
    where: {
      [Op.or]: dishIds(req.body.ids) // function to take ids from req.body and split id values into array of objects
    },
    attributes: ['price_in_cents', 'name']
  })
    .then(dbDishData => {
      if (!dbDishData) {
        res.status(404).json({ message: 'No dish found with this id '});
        return;
      }
      res.json(dbDishData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;