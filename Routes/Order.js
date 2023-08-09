import express from "express";
import { deleteOrder, getallOrders, newOrderwithCod, newOrderwithOnline, updateOrder } from "../Controller/Order.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/allOrders",isAuthenticated,  getallOrders)

router.post("/newOrder",isAuthenticated, newOrderwithOnline)
router.post("/newOrderCod",isAuthenticated, newOrderwithCod)
router.put("/Order/:id",isAuthenticated, updateOrder)
router.delete("/order/:id",isAuthenticated, deleteOrder)

export default router;