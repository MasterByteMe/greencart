import express from 'express';
import { getUserOrders, placedOrderCOD, getAllOrders, placedOrderStripe } from '../controllers/orderController.js';
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";

const orderRouter = express.Router();

// ✅ Place COD order (sensitive)
orderRouter.post('/cod', authUser, (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    placedOrderCOD(req, res, next);
});

// ✅ Get orders for logged-in user
orderRouter.get('/user', authUser, (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    getUserOrders(req, res, next);
});

// ✅ Get all orders (seller/admin)
orderRouter.get('/seller', authSeller, (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    getAllOrders(req, res, next);
});

// ✅ Stripe order (sensitive)
orderRouter.post('/stripe', authUser, (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    placedOrderStripe(req, res, next);
});

export default orderRouter;
