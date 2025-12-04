import express from 'express';
import authUser from "../middlewares/authUser.js";
import { updateCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

// ✅ Update cart (sensitive, user-specific)
cartRouter.post('/update', authUser, (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    updateCart(req, res, next);
});

export default cartRouter;
