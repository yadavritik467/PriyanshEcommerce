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

export default router;