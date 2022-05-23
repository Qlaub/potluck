const path = require('path');
const express = require('express');
require('dotenv').config();
//const session = require('express-session'); (uncomment once cookies are necessary)
//const exphbs = require('express-handlebars'); (uncomment once handlebars)
//const helpers = require('./utils/helpers'); handlebars - utils/helper  (uncomment once handlebars)

// credit card payment package
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const app = express();
const PORT = process.env.PORT || 3002;

const sequelize = require('./config/config');

//const customersSeed = require('./seeds/customer-seeds');
const seedsSync = require('./seeds/index');
//const SequelizeStore = require('connect-session-sequelize')(session.Store); (uncomment once cookies are necessary)

/*
const sess = {
  secret: 'Super secret secret', (uncomment once cookies are necessary)
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess)); (uncomment once cookies are necessary)
*/

//const hbs = exphbs.create({});  (uncomment once handlebars)

//app.engine('handlebars', hbs.engine);  (uncomment once handlebars)
//app.set('view engine', 'handlebars');  (uncomment once handlebars)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // (uncomment once handlebars)

app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({force: true}).then(() => seedsSync())
});
