import express from 'express';
import authUser from "../middlewares/authUser.js";
import { updateCart } from '../controllers/cartController.js';


// Middleware to prevent caching
const noCache = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
};


const cartRouter = express.Router();

// ✅ Update cart (sensitive, user-specific)
cartRouter.post('/update', authUser, noCache, updateCart);

export default cartRouter;
