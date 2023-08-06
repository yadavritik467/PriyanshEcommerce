import express from "express";
<<<<<<< HEAD
import { deleteUser, forgotPassword, getAllUsers, loginUser, registerUser, resetPassword, updateProfile } from "../Controller/User.js";

=======
import { deleteUser, getAllUsers, loginUser, registerUser } from "../Controller/User.js";
import jwt from "jsonwebtoken";
>>>>>>> a2db3b1f2f06d0f62d136832e7bcf08b3302c327


const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/forgotPassword", forgotPassword)


router.put("/password/reset/:token",resetPassword)
router.put("/users/:id",updateProfile)

router.delete("/users/:id",deleteUser)

router.get("/allUsers",getAllUsers )

<<<<<<< HEAD
export default router;
=======
// google authentication





export default router;
>>>>>>> a2db3b1f2f06d0f62d136832e7bcf08b3302c327
