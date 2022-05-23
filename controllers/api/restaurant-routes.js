const router = require('express').Router();
const { Dish } = require('../../models');

// Create a new menu item
router.post('/', (req, res) => {
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

// Find a dish by id
router.get('/dishes/:id', (req, res) => {
  Dish.findOne({
    where: {
      id: req.params.id
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