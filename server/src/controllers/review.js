import express from 'express';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import { isLoggedIn } from '../middleware/auth.js';

const router = express.Router();

router.post('/products/:productId/reviews', isLoggedIn, async (req, res) => {
    const { productId } = req.params;
    const { rating, review } = req.body;
    const { userId } = req;
    const product = await Product.findById(productId);
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    const newReview = await Review.create({ rating, review, author: userId });

    product.reviews.push(newReview._id);

    await product.save();
    res.json({ message: 'Review created successfully' });
});

export default router;