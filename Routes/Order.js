import express from "express";
import { deleteOrder, getallOrders, newOrderwithCod, newOrderwithOnline, updateOrder } from "../Controller/Order.js";

const router = express.Router();

router.get("/allOrders", getallOrders)

router.post("/newOrder", newOrderwithOnline)
router.post("/newOrderCod", newOrderwithCod)
router.put("/Order/:id", updateOrder)
router.delete("/order/:id", deleteOrder)

export default router;