import express from "express";
import { createAllProducts, deleteProducts, getAllProducts, updateProducts } from "../Controller/Product.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/createProduct",isAuthenticated,isAdmin, createAllProducts)

router.get("/allProducts",getAllProducts)

router.delete("/product/:id", isAuthenticated,isAdmin,deleteProducts)

router.put("/product/:id",isAuthenticated,isAdmin,updateProducts)

export default router;