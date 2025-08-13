import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4001/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract email from Google profile
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(null, false, { message: "No email found in Google account" });
        }

        // Check if user already exists in DB
        const user = await User.findOne({ email });

        if (!user) {
          // If user is not registered → pass profile so route can redirect with error
          return done(null, { email, isNewUser: true });
        }

        // If user exists → pass user object
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Required for persistent login sessions (optional if you use JWT)
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
