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
        const email = profile.emails?.[0]?.value;
        if (!email) return done(null, false, { message: "No email found in Google account" });

        // Check if user already exists by email
        let user = await User.findOne({ email });

        if (!user) {
          // Auto-register new Google user
          user = await User.create({
            username: profile.displayName || email.split("@")[0], // ✅ set username
            email,
            googleId: profile.id,
            avatar: profile.photos?.[0]?.value || "",
          });
        }

        // Return full user object
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// ✅ For session support (not required for JWT, but harmless)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

export default passport;
