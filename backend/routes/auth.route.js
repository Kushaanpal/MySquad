import express from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Redirect to Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    if (req.user.isNewUser) {
      // Unregistered user → redirect with error param
      return res.redirect("http://localhost:5173/login?error=id_not_registered");
    }

    // Registered user → issue token
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });

    // Redirect to frontend with token in query
    res.redirect(`http://localhost:5173/login?token=${token}`);
  }
);

export default router;
