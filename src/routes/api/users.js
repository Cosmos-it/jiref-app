const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const keys = require('../../../config/keys')
const jwt = require('jsonwebtoken')
const router = express.Router();
const passport = require('passport');

//load user module
const User = require('../../models/user');

// validate user input
const validateRegisterInput = require('../../../validation/register-validation');
const validationLoginInput = require('../../../validation/login-validation');

/********************************************* */
// @route    GET api.jiref.com/users/register
// @desc     Register User
// @access   Private
router.post('/register', (req, res) => {
  // begin registration.
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {

      /// grabs a user gravatar or profile image if they have one attached to their email
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      // Hashing and saltinng the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
      })
    }
  });
});

/********************************************* */
// @route    GET api.jiref.com/users/login
// @desc     Login User - Returning JWT Token
// @access   Private
router.post('/login', (req, res) => {
  const {
    errors,
    isValid
  } = validationLoginInput(req.body);

  // Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) { // check for user email
      return res.status(404).json({
        email: 'User not found'
      });
    }

    bcrypt.compare(password, user.password)
      .then(match => { // check for password
        if (match) {
          //User matched
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          }; //jwt paylaod

          //Sign token
          jwt.sign(payload, keys.secretOrKey,
            {
              expiresIn: 3600
            }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            })

        } else {
          return res.status(400).json({
            password: 'Password incorrect'
          });
        }
      });

  });
});

/********************************************* */
// @route    GET api.jiref.com/users/current
// @desc     Return current User
// @access   Private
router.get('/current', passport.authenticate('jwt', {
  sesssion: false
}), (req, res) => {

  if (req.user) {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });

  } else {
    return res.json({
      success: false
    });
  }
})

module.exports = router;
