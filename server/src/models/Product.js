import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, {versionKey: false, timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product;