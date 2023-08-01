import express from "express";
import {  contentDelete_2,  contenthandler_2, getAllContent_2 } from "../Controller/Content.js";


const router = express.Router();

router.get("/getContent_2",getAllContent_2)

router.delete("/deleteContent_2/:id",contentDelete_2)
router.post("/update_2",contenthandler_2)

export default router;