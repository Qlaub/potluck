const router = require('express').Router();
const { Donor } = require('../../models');

// Supports show-all-donors option if we're still implementing it
router.get('/', (req, res) => {
    Donor.findAll({
        attributes: { exlude: ['password'] }
    })
    .then(dbDonorData => res.json(dbDonorData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// Supports User Sign-Up
router.post('/', (req, res) => {
    Donor.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(dbDonorData => {
      /*req.session.save(() => {
        req.session.donor_id = dbDonorData.id;
        req.session.username = dbDonorData.username;
        req.session.loggedIn = true; */
        console.log("Donor has been created!!!");
        res.json(dbDonorData);
      });
    })
  //});

  // Supports User Log-in
  router.post('/login', (req, res) => {
    Donor.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbDonorData => {
      if (!dbDonorData) {
        res.status(400).json({ message: 'No donor profile with that email address.  Try again.' });
        return;
      }
      const validPassword = dbDonorData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'The password you have entered is incorrect.  Try again.' });
        return;
      }
  /*
    req.session.save(() => {
        req.session.donor_id = dbDonorData.id;
        req.session.username = dbDonorData.username;
        req.session.loggedIn = true; */
  
        res.json({ user: dbDonorData, message: 'You are now online!' });
      });
    });
  //});
  
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