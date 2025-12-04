import express from 'express';
import { addAddress, getAddress } from '../controllers/addressController.js';
import authUser from "../middlewares/authUser.js";



// Middleware to prevent caching
const noCache = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
};


const addressRouter = express.Router();

// ✅ Add address (sensitive)
addressRouter.post('/add', authUser, noCache, addAddress);

// ✅ Get addresses (sensitive)
addressRouter.get('/get', authUser, noCache, getAddress);

export default addressRouter;
