import express from 'express';
import { addAddress, getAddress } from '../controllers/addressController.js';
import authUser from "../middlewares/authUser.js";

const addressRouter = express.Router();

// ✅ Add address (sensitive)
addressRouter.post('/add', authUser, (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    addAddress(req, res, next);
});

// ✅ Get addresses (sensitive)
addressRouter.get('/get', authUser, (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    getAddress(req, res, next);
});

export default addressRouter;
