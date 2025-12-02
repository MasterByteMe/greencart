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

//app
const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect DB and Cloudinary
await connectDB();
await connectCloudinary();

const allowedOrigins = ['https://greencart-m.vercel.app'];


// ✅ Stripe webhook must be BEFORE express.json()
app.post(
    '/stripe',
    express.raw({ type: 'application/json' }),
    stripeWebhooks
);

// ✅ Regular middleware comes AFTER the webhook
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // Allow server-to-server
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('CORS: Not allowed by policy'));
            }
        },
        credentials: true,
    })
);

app.get('/', (req, res) => res.send('API is working ✅'));

// ✅ Register all routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// ✅ Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
});
