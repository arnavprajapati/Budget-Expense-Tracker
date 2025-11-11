import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthModal from './AuthModal';
import landingImage from '../assets/landing-image.jpg';

function LandingPage() {
    const [modalView, setModalView] = useState(null);
    const isLoggedIn = useSelector(state => state.auth.token);

    const handleCloseModal = () => {
        setModalView(null);
    };

    const handleToggleModalView = () => {
        setModalView(modalView === 'login' ? 'register' : 'login');
    };

    useEffect(() => {
        if (isLoggedIn) {
            handleCloseModal();
        }
    }, [isLoggedIn]);


    return (
        <div className="h-screen relative overflow-hidden">

            {modalView && (
                <AuthModal
                    onClose={handleCloseModal}
                    currentView={modalView}
                    toggleView={handleToggleModalView}
                />
            )}

            <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-8 h-full relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between w-full pb-20 pt-10 md:pt-0">
                    <div className="flex-1 max-w-xl">
                        <h1 className="text-7xl font-bold mb-4">
                            Take Control<br />of <span className='text-[#387ED1]'>Your Money</span>
                        </h1>
                        <p className="text-gray-600 font-bold text-xl mb-8">
                            Personal budgeting is the secret to financial freedom. Start your journey today.
                        </p>

                        <div className="flex space-x-4 max-w-sm">
                            <button
                                onClick={() => setModalView('login')}
                                className="flex-1 text-lg py-3 rounded-lg font-semibold text-white cursor-pointer bg-[#387ED1] hover:bg-blue-600 transition duration-200 shadow-lg"
                            >
                                <span>Login</span>
                            </button>
                            <button
                                onClick={() => setModalView('register')}
                                className="flex-1 text-lg py-3 rounded-lg font-semibold text-gray-800 cursor-pointer bg-gray-200 border border-gray-300 hover:bg-gray-300 transition duration-200 shadow-lg"
                            >
                                <span>Register</span>
                            </button>
                        </div>
                    </div>
                    <div className="md:flex-1 flex justify-center items-center mt-10 md:mt-0">
                        <img
                            src={landingImage}
                            alt="Landing Visual"
                            className="w-full max-w-sm md:max-w-lg h-auto object-contain"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-0 transform translate-y-4 pointer-events-none">
                <svg viewBox="0 0 1440 420" className="w-full">
                    <path fill={'#387ED1'} d="M0,250L48,266C96,282,192,314,288,314C384,314,480,282,576,276.7C672,271,768,293,864,298C960,303,1056,293,1152,282C1248,271,1344,261,1392,256.3L1440,250L1440,420L1392,420C1344,420,1248,420,1152,420C1056,420,960,420,864,420C768,420,672,420,576,420C480,420,384,420,288,420C192,420,96,420,48,420L0,420Z"></path>
                </svg>
            </div>
        </div>
    );
}

export default LandingPage;