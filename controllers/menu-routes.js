let router = require('express').Router();
const { Dish, Restaurant } = require('../models');

router.get('/:id', (req, res) => {
  Restaurant.findOne({
    where: Number(req.params.id),
    include: [
      {
        model: Dish,
        attributes: ['id', 'price_in_cents', 'name']
      }
    ]
  })
    .then(dbRestaurantData => {
      let restaurantData = dbRestaurantData.get({ plain: true });
      res.render('menu', {restaurantData: restaurantData, session: req.session})})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })}
);

module.exports = router;