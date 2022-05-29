let router = require('express').Router();
const { Dish, Restaurant } = require('../models');



router.post('/', (req, res) => {
        Restaurant.findOne({
          where: req.body.id,
          include: [
            {
              model: Dish,
              attributes: ['id', 'price_in_cents', 'name']
            }
          ]
        })
          .then(dbRestaurantData => {
            const restaurantData = dbRestaurantData.get({ plain: true });
            console.log((restaurantData))
            res.render('menu')})
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          })}
          );

module.exports = router;