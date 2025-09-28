import express from 'express';
import User from '../models/User.js';
import { BadRequestError, AuthenticationError } from '../core/ApiError.js';
import bcrypt from 'bcrypt';
import { isLoggedIn } from '../middleware/auth.js'; 
import jwt from 'jsonwebtoken';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'weneedbettersecret';

router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    // check if username already exists
    const user = await User.findOne({ username });

    if (user) {
        throw new BadRequestError('User with this username already exists');
    }
    // hash the password and create the user
    const hash = await bcrypt.hash(password, 12);

    // creating the user in the database
    await User.create({ username, password: hash, email, role });
    
    res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // checks if user with this username exists in the database.
    const user = await User.findOne({ username });

    if (!user) {
        throw new AuthenticationError('Username or password is incorrect');
    }

    // check if password is correct.
    const isValid = bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new AuthenticationError('Username or password is incorrect');
    }

    // create a token - jsonwebtoken - jwt
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.status(200).json({ token });
});

router.get('/profile', isLoggedIn, async(req, res) => {
    const { userId } = req;
    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw new BadRequestError('Invalid UserId');
    }
    res.json(user);;
})

export default router;