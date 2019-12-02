const Users = require("../model/user");
const bcrypt = require("bcryptjs");

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

exports.getLogin = (req, res, next) => {
  res.render("page-login", {
    title: "Đăng nhập"
  });
};
