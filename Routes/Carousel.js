import express from "express";
import { carouselDelete, carouselHandler, contenthandler_1, contenthandler_2, getAllCarousel } from "../Controller/Content.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";


const router = express.Router();

router.get("/getCarousel",getAllCarousel)

router.delete("/deleteCarousel/:id",isAuthenticated,isAdmin, carouselDelete)

router.post("/update_3",isAuthenticated,isAdmin,carouselHandler)

export default router;