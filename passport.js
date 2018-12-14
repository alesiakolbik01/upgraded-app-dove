const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const userService = require('./lib/services/user');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '280a6cde-5919-4b49-bb21-fbc6e9d30251';

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        userService.findOne({ _id: jwt_payload.id })
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.error(err));
    }));
};