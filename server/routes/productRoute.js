import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from "../middlewares/authSeller.js";
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

// Middleware to prevent caching
const noCache = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
};


const productRouter = express.Router();

// ✅ Add product (sensitive: prevent caching)
productRouter.post('/add', upload.array('images'), authSeller, noCache, addProduct);

// ✅ Change stock (sensitive: prevent caching)
productRouter.post('/stock', authSeller, noCache, changeStock);

// Public routes (can be cached normally)
productRouter.get('/list', productList);
productRouter.get('/id', productById);

export default productRouter;
