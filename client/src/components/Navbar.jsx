import React from 'react';
import { Wallet, Trash2, LogIn, UserPlus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser'; 

function Navbar() { 
    const { isLoggedIn, userName, handleLogout } = useUser(); 
    const location = useLocation(); 

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <nav className="bg-white fixed top-0 pt-4 pl-8 w-full z-20">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 py-4"> 
                <div className="flex items-center justify-between">
                    
                    <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center space-x-2 cursor-pointer">
                        <Wallet className="w-8 h-8 text-[#387ED1]" />
                        <span className="text-xl font-bold text-gray-900">ExpenseTracker</span>
                    </Link>

                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-lg font-semibold text-gray-700 hidden sm:inline">
                                Hello, {userName}!
                            </span>
                            <button
                                onClick={handleLogout} 
                                className="p-2 rounded-full cursor-pointer text-red-500 hover:bg-red-100 transition duration-150 flex items-center space-x-1 font-semibold"
                            >
                                <Trash2 className="w-6 h-6" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;