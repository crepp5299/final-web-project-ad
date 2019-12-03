const Users = require("../model/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.getUser = (req, res, next) => {
  Users.find()
    .then(users => {
      res.render("ecommerce-users", {
        title: "Quản lý tài khoản khách hàng",
        allUser: users
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("index", { title: "Trang chính" });
  } else {
    res.redirect("/login");
  }
};

exports.getLogin = (req, res, next) => {
  const message = req.flash("error")[0];
  res.render("page-login", {
    title: "Đăng nhập",
    message: `${message}`
  });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local-signin", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
};

exports.getLogout = (req, res, next) => {
  req.logout();
  res.redirect("/login");
};

exports.getSignUp = (req, res, next) => {
  const message = req.flash("error")[0];
  console.log(message);
  console.log(req.flash("success")[0]);
  res.render("page-register", {
    title: "Thêm tài khoản",
    message: `${message}`
  });
};

exports.postSignUp = (req, res, next) => {
  passport.authenticate("local-signup", {
    successReturnToOrRedirect: "/users",
    failureRedirect: "/create-account",
    failureFlash: true
  })(req, res, next);
};

exports.getEditUser = (req, res, next) => {
  const message = req.flash("error")[0];
  console.log(message);
  console.log(req.flash("success")[0]);
  const userId = req.params.userId;
  Users.findOne({ _id: userId })
    .then(user => {
      res.render("ecommerce-user-edit", {
        title: "Thay đổi thông tin người dùng",
        info: user
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postEditUser = (req, res, next) => {
  passport.authenticate("local-edit", {
    successReturnToOrRedirect: "/users",
    failureRedirect: "/edit-user/:userId",
    failureFlash: true
  })(req, res, next);
};
