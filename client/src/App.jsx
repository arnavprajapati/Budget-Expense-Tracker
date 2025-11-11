import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { useUser } from './hooks/useUser';
import { fetchBudgets } from './store/slice/budgetSlice';

const App = () => {
  const dispatch = useDispatch();
  const { userName, isLoggedIn, handleLogout } = useUser();
  const budgetStatus = useSelector(state => state.budgets.status);

  useEffect(() => {
    if (isLoggedIn && budgetStatus === 'idle') {
      dispatch(fetchBudgets());

      if (localStorage.getItem('budgets')) {
        localStorage.removeItem('budgets');
      }
    }
  }, [dispatch, isLoggedIn, budgetStatus]);

  return (
    <div className="h-screen">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="h-full">
        {isLoggedIn ? (
          <Dashboard userName={userName} handleLogout={handleLogout} />
        ) : (
          <LandingPage />
        )}
      </div>
    </div>
  );
};

export default App;