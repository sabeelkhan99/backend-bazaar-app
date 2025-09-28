import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../core/ApiError.js';

const JWT_SECRET = process.env.JWT_SECRET || 'weneedbettersecret';

export const isLoggedIn = (req, res, next) => {
    const token = req.headers?.authorization?.replace('Bearer ', "");
    try {
        const {userId} = jwt.verify(token, JWT_SECRET);
        req.userId = userId;
        return next()
    }
    catch (err) {
         return next(new AuthenticationError('Please login to continue'));
    }
}