import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout } from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";

const sellerRouter = express.Router();

// ✅ Seller login (sensitive: sets cookie)
sellerRouter.post("/login", async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store'); // Prevent caching
    try {
        await sellerLogin(req, res);
    } catch (err) {
        next(err);
    }
});

// ✅ Check if seller is authenticated (sensitive)
sellerRouter.get("/is-auth", authSeller, (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store'); // Prevent caching
    try {
        isSellerAuth(req, res);
    } catch (err) {
        next(err);
    }
});

// ✅ Logout seller (sensitive: clears cookie)
sellerRouter.get("/logout", authSeller, (req, res) => {
    res.setHeader('Cache-Control', 'no-store'); // Prevent caching
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
    });
    return res.json({ success: true, message: "Logged Out Successfully" });
});

export default sellerRouter;
