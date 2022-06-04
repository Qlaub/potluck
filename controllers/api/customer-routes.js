const router = require('express').Router();
const { Customer, Badge } = require('../../models');
const { validateEmail } = require('../../utils/validate');

// Supports show-all-customers option if we're still implementing it
router.get('/', (req, res) => {
    Customer.findAll({
        attributes: { exclude: ['password', 'validation_key', 'validated_email'] }
    })
    .then(dbCustomerData => res.json(dbCustomerData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get email validation key if email isn't validated
router.post('/validate', (req, res) => {
  Customer.findOne({
    where: {
      id: req.body.id
    },
    attributes: { exclude: ['password', 'total_donated', 'username'] }
  })
  .then(dbCustomerData => {
    // checks if user has already validated their email
    if (!dbCustomerData) {
      res.status(404).json({ message: 'No user found with that ID' })
    } else if (dbCustomerData.dataValues.validated_email === 0) {
      res.json(dbCustomerData);
    } else {
      res.json({message: 'Already validated'});
    }
  })
  .catch(err => {
     console.log(err);
     res.status(500).json(err);
  });
});

// validates users email
router.put('/validate', async (req, res) => {
  const valid = await validateEmail(req.body.id, req.body.userInput);

  if (valid) {
    Customer.update(
      {
        validated_email: 1
      },
      {
        where: { id: valid.id }
      }
    ).then(dbCustomerData => res.json({ href : 'validated' }))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  }
})

// find user by verification code and return verification information
router.post('/code', (req, res) => {
  Customer.findOne({
    where: {
      validation_key: req.body.code
    },
    attributes: { exclude: ['password', 'total_donated', 'username'] }
  })
  .then(dbCustomerData => {
    if (!dbCustomerData) {
      res.status(404).json();
    } // checks if user has already validated their email
    else if (dbCustomerData.dataValues.validated_email === 0) {
      res.json(dbCustomerData);
    } else {
      res.json({message: 'Already validated'});
    }
  })
  .catch(err => {
     console.log(err);
     res.status(500).json(err);
  });
});

// Supports User Sign-Up
router.post('/', (req, res) => {
    Customer.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      total_donated: 0,
      validated_email: 0,
      // random 6-digit key generated
      validation_key: Math.floor(100000 + Math.random() * 900000)
    })
    .then(dbCustomerData => {
      req.session.save(() => {
        req.session.customer_id = dbCustomerData.id;
        req.session.username = dbCustomerData.username;
        req.session.loggedIn = true;
        console.log("Customer has been created!!!");
        res.json(dbCustomerData);
      });
    })
  });

  // Supports User Log-in
  router.post('/login', async (req, res) => {
    Customer.findOne({
      where: {
        email: req.body.email
      }
    }).then(async dbCustomerData => {
      if (!dbCustomerData) {
        res.status(400).json({ message: 'No customer profile with that email address.  Try again.' });
        return;
      }
      const validPassword = await dbCustomerData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'The password you have entered is incorrect.  Try again.' });
        return;
      }
    req.session.save(() => {
        req.session.customer_id = dbCustomerData.id;
        req.session.username = dbCustomerData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbCustomerData, message: 'You are now online!' });
      });
    });
  });
  
  // Supports user logout
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

  //badges route that shows all customers with badges
  // We can determine badge offered to customer depending on donation input, how much they have donated so far,
  // and providing a badge for their achievement
  router.get('/badges', (req, res) => {
    Customer.findAll({include: Badge }).then(customers => {
      customers = customers.filter(customer => customer.badges.length >= 1 );
      res.json(customers);
    })
  })
  
  router.put('/donation', async (req, res) => {
    Customer.increment('total_donated', { 
      by: req.body.amount,
      where: {
        id: req.body.customerId
      }
    })
      .then(dbCustomerData => {
        if (!dbCustomerData) {
          res.status(404).json({ message: 'No Customer found with that ID '})
        }
        res.json(dbCustomerData)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;