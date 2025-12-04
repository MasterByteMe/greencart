import express from 'express';
import { isAuth, login, logout, register } from '../controllers/userController.js';
import authUser from "../middlewares/authUser.js";



// Middleware to prevent caching
const noCache = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
};


const userRouter = express.Router();

// ✅ Register user (public route)
userRouter.post('/register', register);

// ✅ Login user (sensitive: sets cookie)
userRouter.post('/login', noCache, login);

// ✅ Check if user is authenticated (sensitive)
userRouter.get('/is-auth', authUser, noCache, isAuth);

// ✅ Logout user (sensitive: clears cookie)
userRouter.get('/logout', authUser, noCache, logout);
