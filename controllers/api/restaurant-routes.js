const router = require('express').Router();
const { Dish, Restaurant } = require('../../models');
const { Op } = require('sequelize');
const {dishIds} = require('../../utils/routeHelper');

// Get all restaurants
router.get('/', (req, res) => {
  Restaurant.findAll()
    .then(dbRestaurantData => res.json(dbRestaurantData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Find all menu items with matching ID values
// expects request with json body as { ids: [1, 2, 3, 4, etc...] } - each integer being the id of a particular dish selected for checkout
router.put('/dishes/', (req, res) => {
  Dish.findAll({
    where: {
      [Op.or]: dishIds(req.body.ids) // function to take ids from req.body and split id values into array of objects
    },
    attributes: ['price_in_cents', 'name', 'restaurant_id'],
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

// Create a new restaurant (used just for development until seeds are ready)
router.post('/', (req, res) => {
  Restaurant.create({
    name: req.body.name,
    restaurant_balance: 0
  })
    .then(dbRestaurantData => res.json(dbRestaurantData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new menu item
router.post('/dishes', (req, res) => {
  Dish.create({
    id: req.body.id,
    price_in_cents: req.body.price_in_cents,
    name: req.body.name,
    restaurant_id: req.body.restaurant_id
  })
    .then(dbDishData => res.json(dbDishData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Change restaurant balance
// Expects an ID in req.params as well as amount integer in req.body, example: { "amount": 20 }
router.put('/:id', async (req, res) => {
  Restaurant.increment('balance', { 
    by: req.body.amount,
    where: {
      id: req.params.id
    }
  })
    .then(dbRestaurantData => {
      if (!dbRestaurantData) {
        res.status(404).json({ message: 'No restaurant found with that ID '})
      }
      res.json(dbRestaurantData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;