import passport from 'passport'; // Passport.js authentication middleware
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
import User from "../models/userModel.js";


 //Configure JWT options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Extract JWT from Authorization header
opts.secretOrKey = process.env.JWT_SECRET; // Secret key for JWT verification


//Define JWT strategy for Passport.js
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

    //Verify JWT payload and find user by ID
    User.findById(jwt_payload.id)
        .then(user => {
        if (user) {
            return done(null, user);
        }
        return done(null, false);
        })
        .catch(err => console.log(err));
    }));


    //Define Local strategy for Passport.js
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        //Find user by email
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