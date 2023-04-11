import Axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

import {
	LOGIN_LOADING_TRUE,
	LOGIN_LOADING_FALSE,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SET_CURRENT_USER
} from '../types';

import isEmpty from '../../utils/isEmpty';

const cookies = new Cookies ();

// Set logged user
export const user_set_current = (decoded) => dispatch => {
	sessionStorage.setItem('isAuthenticated', !isEmpty(decoded));

	dispatch({
		type: SET_CURRENT_USER,
		payload: decoded
	})
}

// Log user in
export const user_login = (loginUserInfo) => dispatch => {
	dispatch({ type: LOGIN_LOADING_TRUE });	

	let url = process.env.REACT_APP_SERVER_URL + '/api/users/login';

	Axios.post(url, loginUserInfo)
	.then((res) => {
		dispatch({ type: LOGIN_LOADING_FALSE });
		
		process.env.REACT_APP_RUNTIME === "Production" || process.env.REACT_APP_RUNTIME === "Test" ?
			cookies.set (process.env.REACT_APP_JWT_KEY, res.data.token, {
				path: "/", 
				domain: ".time.silverse.mx", 
				secure: true
			}) :
			cookies.set (process.env.REACT_APP_JWT_KEY, res.data.token, {
				path: "/", 
				domain: ".localhost.com"
			});
		
		auth_token_set (res.data.token);						// set token to auth header
		let decoded = jwt_decode (res.data.token);	// decode token to get user data
		dispatch(user_set_current(decoded));				// set current user

		dispatch({ type: LOGIN_SUCCESS });
		
		setTimeout(() => {
			window.location.href = '/apps';
		}, 2250);
	}).catch((err) => {
		dispatch({
			type: LOGIN_ERROR,
			payload: { type: 'user_login', msg: err.message }
		})
		
		dispatch({ type: LOGIN_LOADING_FALSE });
	})
};

// Log user out
export const auth_token_remove = () => dispatch => {
	// const cookies = new Cookies ();
	process.env.REACT_APP_RUNTIME === 'Production' || process.env.REACT_APP_RUNTIME === 'Test' ?
		cookies.remove (process.env.REACT_APP_JWT_KEY, {
			path: '/', 
			domain: '.time.silverse.mx'
		}) :
		cookies.remove (process.env.REACT_APP_JWT_KEY, {
			path: '/', 
			domain: '.localhost.com'
		});
	
	// remove auth header for future requests
	localStorage.clear();
	window.location.href = process.env.REACT_APP_LOGIN;
	auth_token_set (null);
	dispatch (user_set_current ({}));
	// dispatch (alert_set ('You have logged out!', 'success'));
};

// Check for user token
export const user_token_check = (store) => {
	// const cookies = new Cookies ();
	let jwt = cookies.get (process.env.REACT_APP_JWT_KEY);

	// localStorage.jwtToken
	if (jwt) {
		// check for expired token
		let decoded = jwt_decode (jwt);
		let currentTime = Date.now () / 1000;
		if (decoded.exp < currentTime) {
			// logout the user
			store.dispatch (auth_token_remove ());
			// store.dispatch (profile_clear_current ());
			window.location.href = process.env.REACT_APP_LOGIN;
		}
		else {
			auth_token_set (jwt);           // set auth token header auth
			store.dispatch (user_set_current (decoded));
		}
	}
}

// Set auth token for each request
const auth_token_set = token => {
	// Apply to every request
	if (token) Axios.defaults.headers.common['Authorization'] = token;
	else delete Axios.defaults.headers.common['Authorization'];
};
