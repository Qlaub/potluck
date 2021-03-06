const path = require('path');
const express = require('express');
require('dotenv').config();
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers'); // what is this used for?

// credit card payment package
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const app = express();
const PORT = process.env.PORT || 3002;

const sequelize = require('./config/config');

const seedsSync = require('./seeds/index');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({helpers}); 

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({force: true}).then(() => seedsSync())
});

