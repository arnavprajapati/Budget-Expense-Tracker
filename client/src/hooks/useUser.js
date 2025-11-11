// hooks/useUser.js (Revised)
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';

export const useUser = () => {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const userName = useSelector((state) => state.auth.user);

    const isLoggedIn = !!token;

    const handleLogout = () => {
        dispatch(logout());
    };

    return {
        userName,
        isLoggedIn,
        handleLogout,
        token
    };
};