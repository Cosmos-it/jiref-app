const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

module.exports = pass => {
   const opts = {}
   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
   opts.secretOrKey = keys.secretOrKey;

   /*********************************************/
   // do the following before finding the user from the database

   passport.serializeUser((user, done) => {
      done(null, user.id);
   });


   passport.deserializeUser((id, done) => {
      User.findById(id).then((user) => {
         done(null, user);
      });
   });

   
   /*******************************************/

   pass.use(new JwtStrategy(opts, (jwt_payload, done) => {

         User.findById(jwt_payload.id)
            .then(user => {

               if (user) {
                  return done(null, user);
               }
               return done(null, false);
               // or you could create a new account

            }).catch(err => console.log(err)

            );
      })

   );
}