import express from "express";
import { deleteUser, getAllUsers, loginUser, registerUser } from "../Controller/User.js";
import jwt from "jsonwebtoken";


const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)

router.delete("/users/:id",deleteUser)

router.get("/allUsers",getAllUsers )

// google authentication





export default router;
