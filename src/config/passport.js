import passport from 'passport';
import GoogleStratery from 'passport-google-oauth20';
import { env } from './environment';

passport.use(new GoogleStratery({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

module.exports = passport;