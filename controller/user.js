const Users = require("../model/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.getUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    Users.find()
      .then(users => {
        res.render("ecommerce-users", {
          title: "Quản lý tài khoản",
          allUser: users,
          user: req.user
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.redirect("/login");
  }
};

exports.getIndex = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("index", {
      title: "Trang chính",
      user: req.user
    });
  } else {
    res.redirect("/login");
  }
};

exports.getLogin = (req, res, next) => {
  const message = req.flash("error")[0];
  res.render("page-login", {
    title: "Đăng nhập",
    message: `${message}`,
    user: req.user
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

exports.getAddAccount = (req, res, next) => {
  if (req.isAuthenticated()) {
    const message = req.flash("error")[0];
    console.log(message);
    console.log(req.flash("success")[0]);
    res.render("add-account", {
      title: "Thêm tài khoản",
      message: `${message}`,
      user: req.user
    });
  } else {
    res.redirect("/login");
  }
};

exports.postAddAccount = (req, res, next) => {
  passport.authenticate("local-signup", {
    successReturnToOrRedirect: "/add-account",
    failureRedirect: "/add-account",
    failureFlash: true
  })(req, res, next);
};

exports.getEditUser = (req, res, next) => {
  const message = req.flash("error")[0];
  const userId = req.params.userId;
  Users.findOne({ _id: userId })
    .then(user => {
      res.render("ecommerce-user-edit", {
        title: "Thay đổi thông tin người dùng",
        info: user,
        user: req.user
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postEditUser = (req, res, next) => {
  const userId = req.params.userId;
  Users.findOne({ _id: userId })
    .then(user => {
      (user.firstName = req.body.firstName),
        (user.lastName = req.body.lastName),
        (user.phoneNumber = req.body.phoneNumber),
        (user.email = req.body.email),
        (user.address = req.body.address);
      user.save();
      res.redirect("/users");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  Users.deleteOne({ _id: userId }).then(res.redirect("/users"));
};

exports.lockUser = (req, res, next) => {
  const userId = req.params.userId;
  Users.findOne({ _id: userId })
    .then(user => {
      user.isLock = true;
      user.save();
    })
    .then(res.redirect("back"));
};

exports.unlockUser = (req, res, next) => {
  const userId = req.params.userId;
  Users.findOne({ _id: userId })
    .then(user => {
      user.isLock = false;
      user.save();
    })
    .then(res.redirect("back"));
};
