var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

const urlConnect = `mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority
`;

mongoose.connect(urlConnect, { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("Connect successfully!!");
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var usereditRouter = require("./routes/edit-user");
var edashboardRouter = require("./routes/e-dashboard");
var eeditproductRouter = require("./routes/e-edit-product");
var eordersRouter = require("./routes/e-orders");
var eproductdetailRouter = require("./routes/e-product-detail");
var esellersRouter = require("./routes/e-sellers");
var esummaryRouter = require("./routes/e-summary");
var eproductRouter = require("./routes/e-products");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(flash());
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/index.html", indexRouter);
app.use("/users", usersRouter);
app.use("/edit-user", usereditRouter);
app.use("/ecommerce-dashboard.html", edashboardRouter);
app.use("/ecommerce-summary.html", esummaryRouter);
app.use("/ecommerce-orders.html", eordersRouter);
app.use("/ecommerce-sellers.html", esellersRouter);
app.use("/ecommerce-products.html", eproductRouter);
app.use("/ecommerce-product-edit.html", eeditproductRouter);
app.use("/ecommerce-product-detail.html", eproductdetailRouter);

require("./config/passport")(passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
