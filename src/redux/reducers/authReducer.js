import {
	LOGIN_LOADING_TRUE,
	LOGIN_LOADING_FALSE,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SET_CURRENT_USER
} from '../types';

import isEmpty from '../../utils/isEmpty';

let initialState = {
	login_loading: false,
	login_success: false,
	isAuthenticated: false,
	user: {},
	auth_errors: {}
};

export default function authReducer (state = initialState, action) {
	switch (action.type) {
		case LOGIN_LOADING_TRUE:
			delete state.auth_errors.user_login
			return {
				...state,
				login_loading: true
			}
		case LOGIN_LOADING_FALSE:
			return {
				...state,
				login_loading: false
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				login_success: true
			}
		case SET_CURRENT_USER: 
			delete state.auth_errors.user_set_current
			return {
				...state,
				isAuthenticated: !isEmpty (action.payload),
				user: action.payload
			}
		case LOGIN_ERROR:
			return {
				...state,
				auth_errors: {
					...state.auth_errors, 
					[`${action.payload.type}`]: { msg: action.payload.msg }
				}
			}
		default:
			return state;
	}
}
