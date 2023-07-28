import express from "express";
import { createAllProducts, deleteProducts, getAllProducts, updateProducts } from "../Controller/Product.js";

const router = express.Router();

router.post("/createProduct", createAllProducts)

router.get("/allProducts",getAllProducts)
router.delete("/product/:id",deleteProducts)
router.put("/product/:id",updateProducts)

export default router;