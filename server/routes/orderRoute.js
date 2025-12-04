import express from 'express';
import { getUserOrders, placedOrderCOD, getAllOrders, placedOrderStripe } from '../controllers/orderController.js';
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";

// Middleware to prevent caching
const noCache = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
};

const orderRouter = express.Router();

// ✅ Place COD order (sensitive)
orderRouter.post('/cod', authUser, noCache, placedOrderCOD);

// ✅ Get orders for logged-in user
orderRouter.get('/user', authUser, noCache, getUserOrders);

// ✅ Get all orders (seller/admin)
orderRouter.get('/seller', authSeller, noCache, getAllOrders);

// ✅ Stripe order (sensitive)
orderRouter.post('/stripe', authUser, noCache, placedOrderStripe);

export default orderRouter;
