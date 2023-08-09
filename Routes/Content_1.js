import express from "express";
import { contentDelete_1, contenthandler_1, getAllContent_1,  } from "../Controller/Content.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";


const router = express.Router();


router.get("/getContent_1",getAllContent_1)

router.delete("/deleteContent_1/:id",isAuthenticated,isAdmin,contentDelete_1)


router.post("/update_1",isAuthenticated,isAdmin,contenthandler_1)


export default router;