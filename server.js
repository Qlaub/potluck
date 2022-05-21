const path = require('path');
const express = require('express');
//const session = require('express-session');
//const exphbs = require('express-handlebars'); (uncomment once handlebars)
//const helpers = require('./utils/helpers'); handlebars - utils/helper  (uncomment once handlebars)

const app = express();
const PORT = process.env.PORT || 3002;

const sequelize = require('./config/config');
//const SequelizeStore = require('connect-session-sequelize')(session.Store);

/*
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
*/

//const hbs = exphbs.create({});  (uncomment once handlebars)

//app.engine('handlebars', hbs.engine);  (uncomment once handlebars)
//app.set('view engine', 'handlebars');  (uncomment once handlebars)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
