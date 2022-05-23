const router = require('express').Router();
const { Customer } = require('../../models');

// Supports show-all-customers option if we're still implementing it
router.get('/', (req, res) => {
    Customer.findAll({
        attributes: { exlude: ['password'] }
    })
    .then(dbCustomerData => res.json(dbCustomerData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// Supports User Sign-Up
router.post('/', (req, res) => {
    Customer.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(dbCustomerData => {
      /*req.session.save(() => {
        req.session.customer_id = dbCustomerData.id;
        req.session.username = dbCustomerData.username;
        req.session.loggedIn = true; */
        console.log("Customer has been created!!!");
        res.json(dbCustomerData);
      });
    })
  //});

  // Supports User Log-in
  router.post('/login', (req, res) => {
    Customer.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbCustomerData => {
      if (!dbCustomerData) {
        res.status(400).json({ message: 'No customer profile with that email address.  Try again.' });
        return;
      }
      const validPassword = dbCustomerData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'The password you have entered is incorrect.  Try again.' });
        return;
      }
  /*
    req.session.save(() => {
        req.session.customer_id = dbCustomerData.id;
        req.session.username = dbCustomerData.username;
        req.session.loggedIn = true; */
  
        res.json({ user: dbCustomerData, message: 'You are now online!' });
      });
    });
  //});
  
  // Supports uer logout
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => { 
        res.status(204).end();   
      });
    }
    else {
      res.status(404).end();
    }
  });
  
  

module.exports = router;