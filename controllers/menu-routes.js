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
            console.log((restaurantData))
            res.render('menu', {restaurantData})})
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          })} 
          );

module.exports = router;