require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
// require cors as our security package so enable our API to receive server side requests as long as they're coming from this specific location - our react app.

const session     = require ('express-session');
const bcrypt      = require ('bcryptjs');

require('./config/passport-stuff')
  // require in the configuration code we put in config/passport-stuff



mongoose
  .connect('mongodb://localhost/to-do-list-api', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


app.use(session({
  secret:"some secret goes here:"
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  credentials:true,
  origin: ['http://localhost:3000']
}));
// will accept requests as long as they're from localhost:3000 where the react app is being held. 


const index = require('./routes/index');
app.use('/', index);

const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);
// prefix /api for the express api app to separate from the react routes. express routes should ALWAYS be different than the api routes
// third add routes const to the app.js file.

const userRoutes = require('./routes/user-routes');
app.use('/api', userRoutes);

module.exports = app;
