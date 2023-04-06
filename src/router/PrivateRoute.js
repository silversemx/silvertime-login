import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
	const { isAuthenticated } = useSelector(state => state.auth);

	// If authorized, return an outlet that will render child elements
	// If not, return element that will navigate to login page
	
	return isAuthenticated ? <Outlet /> : <Navigate to='/auth' />;
}

export default PrivateRoute;
