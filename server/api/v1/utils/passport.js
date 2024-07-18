import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
import User from "../models/userModel.js"

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => console.log(err));
}));

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
        return done(null, false);
        }

        const isValid = await user.matchPassword(password);

        if (!isValid) {
        return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

export default passport;