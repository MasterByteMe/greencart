import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from "../middlewares/authSeller.js";
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

// ✅ Add product (sensitive: prevent caching)
productRouter.post('/add', upload.array('images'), authSeller, (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    addProduct(req, res, next);
});

// ✅ Change stock (sensitive: prevent caching)
productRouter.post('/stock', authSeller, (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    changeStock(req, res, next);
});

// Public routes (can be cached normally)
productRouter.get('/list', productList);
productRouter.get('/id', productById);

export default productRouter;
