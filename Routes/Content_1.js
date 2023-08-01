import express from "express";
import { contentDelete_1, contenthandler_1, getAllContent_1,  } from "../Controller/Content.js";


const router = express.Router();


router.get("/getContent_1",getAllContent_1)

router.delete("/deleteContent_1/:id",contentDelete_1)


router.post("/update_1",contenthandler_1)


export default router;