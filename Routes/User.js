import express from "express";

import { deleteUser, forgotPassword, getAllUsers, loginUser, registerUser, resetPassword, updateProfile } from "../Controller/User.js";

 


const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/forgotPassword", forgotPassword)


router.put("/password/reset/:token",resetPassword)
router.put("/users/:id",updateProfile)

router.delete("/users/:id",deleteUser)

router.get("/allUsers",getAllUsers )

// router.get(
//     "/auth/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
// );
// router.get(
//     "/auth/google/callback",
//     passport.authenticate("google", { failureRedirect: "/", session: false }),
//     function(req, res) {
//         var token = req.user.token;
//         res.redirect("http://localhost:3000?token=" + token);
//     }
// );


export default router;

// google authentication



 
