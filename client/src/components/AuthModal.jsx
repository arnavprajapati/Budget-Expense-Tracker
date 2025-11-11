import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { loginUser, registerUser, clearAuthError } from '../store/slice/authSlice'; 

function AuthModal({ onClose, currentView, toggleView }) {
    const dispatch = useDispatch();
    const { status, error } = useSelector(state => state.auth);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const isLoading = status === 'loading';
    const isLogin = currentView === 'login';

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearAuthError());

        if (!username.trim() || !password.trim()) return;

        const userData = { username: username.trim(), password };

        if (isLogin) {
            dispatch(loginUser(userData));
        } else {
            dispatch(registerUser(userData));
        }
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-md p-4 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full relative">
                
                <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800">
                    <X className="w-5 h-5" />
                </button>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {isLogin ? "Log In" : "Register"}
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full font-semibold px-4 py-2 border rounded-lg focus:ring-[#387ED1] focus:border-[#387ED1]"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full font-semibold px-4 py-2 border rounded-lg focus:ring-[#387ED1] focus:border-[#387ED1]"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 cursor-pointer bg-[#387ED1] text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
                    >
                        {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    <button
                        onClick={toggleView}
                        disabled={isLoading}
                        className="text-gray-600 cursor-pointer hover:text-[#387ED1] font-semibold"
                    >
                        {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;