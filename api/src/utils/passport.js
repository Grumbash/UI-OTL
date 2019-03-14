require('dotenv').config();


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Cred = require("mongoose").model("creds");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  Cred.findById(jwt_payload.id)
    .then(user => {
      // Optimise
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
    .catch(err => console.log(err));
})
);