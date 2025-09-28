import Product from "../models/Product.js";
import express from 'express';

const router = express.Router();

// get all products
router.get('/products', async(req, res) => {
    // we should have pagination here.
    const products = await Product.find({});
    res.json(products);
});


// create product
router.post('/products', async(req, res) => {
    const { title, description, image, price } = req.body;
    await Product.create({ title, description, image, price });
    res.json({ message: 'Product created successfully' });
});

// get a product
router.get('/products/:productId', async(req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
                select: 'username email role'
            }
        });
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    res.json(product);
});

router.patch('/products/:productId', async(req, res) => {
    const { productId } = req.params;
    const { title, description, price, image } = req.body;
    await Product.findByIdAndUpdate(productId, { title, description, price, image });
    res.json({ message: 'Product updated successfully' });
});

router.delete('/products/:productId', async(req, res) => {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.json({ message: 'product delete successfully' });
}); 

export default router;