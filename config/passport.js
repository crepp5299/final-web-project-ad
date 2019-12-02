const user = require("../model/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    user
      .findOne({
        _id: id
      })
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        console.log(err);
      });
  });

  passport.use(
    "local-signin",
    new LocalStrategy((username, password, done) => {
      user.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Sai tên đăng nhập hoặc mật khẩu."
          });
        }

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return done(err);
          }
          console.log(
            "acc : " + user.username + " " + user.password + " " + password,
            result
          );
          if (!result) {
            return done(null, false, {
              message: "Sai tên đăng nhập hoặc mật khẩu."
            });
          }
          return done(null, user);
        });
      });
    })
  );
};
