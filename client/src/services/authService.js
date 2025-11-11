import axios from 'axios';

const API_URL = "https://budget-expense-tracker-r2jk.onrender.com/api/" || "http://localhost:5000/api/";

const authService = {
    login: async (userData) => {
        const response = await axios.post(API_URL + 'login', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.username);
        }
        return response.data;
    },
    register: async (userData) => {
        const response = await axios.post(API_URL + 'register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.username);
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
    },
    getToken: () => {
        return localStorage.getItem('token');
    }
};

export default authService;