import express from "express";
import { carouselDelete, carouselHandler, contenthandler_1, contenthandler_2, getAllCarousel } from "../Controller/Content.js";


const router = express.Router();

router.get("/getCarousel",getAllCarousel)

router.delete("/deleteCarousel/:id",carouselDelete)

router.post("/update_3",carouselHandler)

export default router;