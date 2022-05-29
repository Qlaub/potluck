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
  },
  {
    "id": 6,
    "price_in_cents": 10000,
    "name": "Meat Stuff",
    "restaurant_id": 2
  },
  {
    "id": 7,
    "price_in_cents": 30000,
    "name": "Plant stuff",
    "restaurant_id": 2
  },
  {
    "id": 8,
    "price_in_cents": 20000,
    "name": "Grain stuff",
    "restaurant_id": 2
  },
  {
    "id": 9,
    "price_in_cents": 40000,
    "name": "Milk stuff",
    "restaurant_id": 2
  },
  {
    "id": 10,
    "price_in_cents": 50000,
    "name": "Sweet stuff",
    "restaurant_id": 2
  },
  {
    "id": 11,
    "price_in_cents": 10000,
    "name": "Meat stuff",
    "restaurant_id": 3
  },
  {
    "id": 12,
    "price_in_cents": 30000,
    "name": "Plant stuff",
    "restaurant_id": 3
  },
  {
    "id": 13,
    "price_in_cents": 20000,
    "name": "Grain stuff",
    "restaurant_id": 3
  },
  {
    "id": 14,
    "price_in_cents": 40000,
    "name": "Milk stuff",
    "restaurant_id": 3
  },
  {
    "id": 15,
    "price_in_cents": 50000,
    "name": "Sweet stuff",
    "restaurant_id": 3
  },
  {
    "id": 16,
    "price_in_cents": 10000,
    "name": "Meat stuff",
    "restaurant_id": 4
  },
  {
    "id": 17,
    "price_in_cents": 30000,
    "name": "Plant stuff",
    "restaurant_id": 4
  },
  {
    "id": 18,
    "price_in_cents": 20000,
    "name": "Grain stuff",
    "restaurant_id": 5
  },
  {
    "id": 19,
    "price_in_cents": 40000,
    "name": "Milk stuff",
    "restaurant_id": 5
  },
  {
    "id": 20,
    "price_in_cents": 50000,
    "name": "Sweet stuff",
    "restaurant_id": 6
  }
];

const dishesSeed = () => Dish.bulkCreate(dishData, {individualHooks: true});

module.exports = dishesSeed;