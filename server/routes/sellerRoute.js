import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout } from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";


// Middleware to prevent caching
const noCache = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
};



const sellerRouter = express.Router();

// ✅ Seller login (sensitive: sets cookie)
sellerRouter.post("/login", noCache, sellerLogin)

// ✅ Check if seller is authenticated (sensitive)
sellerRouter.get("/is-auth", authSeller, noCache, isSellerAuth);

// ✅ Logout seller (sensitive: clears cookie)
sellerRouter.get('/logout', authSeller, noCache, sellerLogout);

export default sellerRouter;
