import express from 'express';
import cors from 'cors';
import productRoutes from './controllers/product.js';
import reviewRoutes from './controllers/review.js';
import authRoutes from './controllers/auth.js';

const frontEndBaseUrl = process.env.FRONTEND_BASE_URL || "http://localhost:5173";

const app = express();
app.use(express.json());
app.use(cors({
    origin: [frontEndBaseUrl],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
}))

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);


// global error handling middleware
app.use((err, req, res, next) => {
    const { message = 'Something went wrong', status = 500 } = err;
    // sanitisaton
    res.status(status).json({ message });
});

export default app;
