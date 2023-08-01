import express from "express";
import { deleteUser, getAllUsers, loginUser, registerUser } from "../Controller/User.js";
import passport from 'passport';
import jwt from "jsonwebtoken";


const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)

router.delete("/users/:id",deleteUser)

router.get("/allUsers",getAllUsers )

// google authentication

router.get(
  "/google",
  passport.authenticate("google", {
      scope: ["profile","email",
      //  'https://www.googleapis.com/auth/user.addresses.read',
      //   'https://www.googleapis.com/auth/user.phonenumbers.read'
      ]
  }))

  

router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/login' }),
(req, res) => {
const {email, name,  } = req.user;

// Generate JWT token
const token = jwt.sign({ email, name, }, process.env.JWT_SECRET, { expiresIn: "365d", });

// Save JWT token in local storage
res.cookie("userID", token ,{ httpOnly: true});
//   console.log(token)
res.redirect('http://localhost:3000');
}
);

// Route to check if the user is authenticated and return the user data
router.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    // If the user is authenticated, you can access the user data from req.user
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});



export default router;