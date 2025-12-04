import express from 'express';
import { isAuth, login, logout, register } from '../controllers/userController.js';
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

// ✅ Register user (public route)
userRouter.post('/register', register);

// ✅ Login user (sensitive: sets cookie)
userRouter.post('/login', async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store'); // Prevent caching
    try {
        await login(req, res);
    } catch (err) {
        next(err);
    }
});

// ✅ Check if user is authenticated (sensitive)
userRouter.get('/is-auth', authUser, (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store'); // Prevent caching
    try {
        isAuth(req, res);
    } catch (err) {
        next(err);
    }
});

// ✅ Logout user (sensitive: clears cookie)
userRouter.get('/logout', authUser, (req, res) => {
    res.setHeader('Cache-Control', 'no-store'); // Prevent caching
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
    });
    return res.json({ success: true, message: "Logged Out Successfully" });
});

export default userRouter;
