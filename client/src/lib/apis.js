import axios from "axios"

const BACKEND_BASE_URL = 'http://localhost:1234';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const fetchProductById = (productId) => {
    return axios.get(`${BACKEND_BASE_URL}/products/${productId}`)
}

export const createReviewForProductId = (productId, review) => {
    return axios.post(`${BACKEND_BASE_URL}/products/${productId}/reviews`, review)
}

export const fetchAllProducts = () => {
    return axios.get(`${BACKEND_BASE_URL}/products`);
}

export const registerNewUser = (user) => {
    return axios.post(`${BACKEND_BASE_URL}/register`, user)
}

export const loginUser = (username, password) => {
    return axios.post(`${BACKEND_BASE_URL}/login`, { username, password })
}

export const fetchCurrentUserProfile = () => {
    return axios.get(`${BACKEND_BASE_URL}/profile`)
}