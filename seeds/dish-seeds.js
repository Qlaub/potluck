const {Dish} = require('../models');

const dishData = [
  {
    "id": 1,
    "price_in_cents": 10000,
    "name": "Meat stuff",
    "restaurant_id": 1
  },
  {
    "id": 2,
    "price_in_cents": 30000,
    "name": "Plant stuff",
    "restaurant_id": 1
  },
  {
    "id": 3,
    "price_in_cents": 20000,
    "name": "Grain stuff",
    "restaurant_id": 1
  },
  {
    "id": 4,
    "price_in_cents": 40000,
    "name": "Milk stuff",
    "restaurant_id": 1
  },
  {
    "id": 5,
    "price_in_cents": 50000,
    "name": "Sweet stuff",
    "restaurant_id": 1
  }
];

const dishesSeed = () => Dish.bulkCreate(dishData, {individualHooks: true});

module.exports = dishesSeed;