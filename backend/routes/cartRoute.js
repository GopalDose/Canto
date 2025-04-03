import express from "express"
import { addToCart, removeFromCarts, getCart, getAllOrders, updateOrderStatus } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();
cartRouter.post("/add", authMiddleware, addToCart)
cartRouter.post("/get", authMiddleware, getCart)
cartRouter.get("/orders", getAllOrders)
cartRouter.put("/orders/:id", updateOrderStatus)

export default cartRouter;