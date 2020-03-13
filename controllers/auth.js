const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getRegister = (req, res, next) => {
  res.render('auth/register', {
    pageTitle: 'Register',
    isAuthenticated: false
  })
};

exports.postRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req. body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if(userDoc) {
        return res.redirect('/register')
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    isAuthenticated: false
  })
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email})
    .then(user => {
      if(!user) {
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if(doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(error => {
              console.log(error);
              res.redirect('/');
            });
          }
          res.redirect('/login');
        })
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error);
    res.redirect('/');
  })
};
