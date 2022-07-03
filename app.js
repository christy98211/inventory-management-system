var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoConfig = require("./config/components/mongo");
const session = require("express-session");

global.ENV = process.env.NODE_ENV || "development";
process.env.NODE_ENV = ENV;

const port = process.env.PORT || 4000;


const indexRouter = require("./routes/index");

const dashboardRouter = require('./routes/dashboard/index');

// var usersRouter = require('./routes/users');
const locationRouterList = require('./routes/location/list');
const locationRouterAdd = require('./routes/location/add');

const stateRouterList = require('./routes/state/list');
const stateRouterAdd = require('./routes/state/add');

const countryRouterList = require('./routes/country/list');
const countryRouterAdd = require('./routes/country/add');

const brandRouterList = require('./routes/brand/list');
const brandRouterAdd = require('./routes/brand/add');

const categoryRouterList = require('./routes/category/list');
const categoryRouterAdd = require('./routes/category/add');

const rolesRouterList = require('./routes/roles/list');
const rolesRouterAdd = require('./routes/roles/add');

const usersRouterList = require('./routes/users/list');
const usersRouterAdd = require('./routes/users/add');

const itemsRouterList = require('./routes/items/list');
const itemsRouterAdd = require('./routes/items/add');

const salesRouterList = require('./routes/sales/list');
const salesRouterAdd = require('./routes/sales/add');

const customersRouterList = require('./routes/customers/list');
const customersRouterAdd = require('./routes/customers/add');

var app = express();
app.use('/public', express.static('public'));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize session middleware
app.set('trust proxy', 1); // trust first proxy
const sess = {
  secret: 'black-milk-media',
  cookie: {
    // secure: true
  },
  // store: new RedisStore(),
  // saveUninitialized: true,
  // resave: false
}
if (app.get('env') === 'production') {
  console.log('###SESSION ENV PRODUCTION####');
  sess.saveUninitialized = true;
  sess.resave = false;
  sess.cookie.secure = true; // serve secure cookies
  // sess.store = new MongoStore();
}

app.use(session(sess));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/", indexRouter);

/** @param - middleware will authenticate if userData variable is found in session,
 * If userData is not found - middleware will redirect you to login page
 */
app.use((req, res, next) => {
  // console.log(req.session.user_id);
  switch(req.session.userData){
      case undefined:
      case null:
        res.redirect("/");
      break;
      default:
      next();
  }
});

app.use('/dashboard', dashboardRouter);
app.use('/location-list',locationRouterList)
app.use('/location-add',locationRouterAdd)
app.use('/state-list',stateRouterList)
app.use('/state-add',stateRouterAdd)
app.use('/country-list',countryRouterList)
app.use('/country-add',countryRouterAdd)
app.use('/brand-list',brandRouterList)
app.use('/brand-add',brandRouterAdd)
app.use('/category-list',categoryRouterList)
app.use('/category-add',categoryRouterAdd)
app.use('/roles-list',rolesRouterList)
app.use('/roles-add',rolesRouterAdd)
app.use('/users-list',usersRouterList)
app.use('/users-add',usersRouterAdd)
app.use('/items-list',itemsRouterList)
app.use('/items-add',itemsRouterAdd)
app.use('/sales-list',salesRouterList)
app.use('/sales-add',salesRouterAdd)
app.use('/customers-list',customersRouterList)
app.use('/customers-add',customersRouterAdd)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port);


module.exports = app;
mongoConfig.bootstrap();

