import express from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 1️⃣ Redirect to Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2️⃣ Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login?error=failed",
  }),
  (req, res) => {
    try {
      // Unify payload for both Google + manual login
      const payload = {
        id: req.user._id,
        email: req.user.email,
        username: req.user.username || req.user.name, // fallback for Google users
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });

      // ✅ Redirect to frontend with token
      res.redirect(`http://localhost:5173/login?token=${token}`);
    } catch (error) {
      console.error("Google login error:", error);
      res.redirect(`http://localhost:5173/login?error=server_error`);
    }
  }
);

export default router;
