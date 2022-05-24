const router = require('express').Router();
const { Restaurant, Dish } = require('../models');

router.get('/:id', (req, res) => {
    console.log(req.session); 
    Restaurant.findOne({ 
        where: req.params.id,
        include: Dish })
      .then(dbRestaurantData => {
        let result = dbRestaurantData.get({plain: true});
        result ??= new Error('Something went wrong in the orderSearch GET /:id request');
        res.render('orderSearch', {result,
        loggedIn: req.session.loggedIn});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;