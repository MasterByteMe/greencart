// import packages
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// 🔥 CORS MUST COME FIRST — ABOVE EVERYTHING
app.use(
    cors({
        origin: ['http://localhost:5173', 'https://greencart-m.vercel.app'],
        credentials: true,
    })
);

// Stripe webhook MUST stay raw AND must stay above json()
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// After CORS
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => res.send('API is working'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
