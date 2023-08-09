import express from "express";
import {  contentDelete_2,  contenthandler_2, getAllContent_2 } from "../Controller/Content.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";


const router = express.Router();

router.get("/getContent_2",getAllContent_2)

router.delete("/deleteContent_2/:id",isAuthenticated,isAdmin,contentDelete_2)
router.post("/update_2",isAuthenticated,isAdmin,contenthandler_2)

export default router;