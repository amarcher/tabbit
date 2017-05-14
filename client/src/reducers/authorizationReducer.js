import Auth from '../auth';

export default function authorizationReducer(authorized = false, action) {
	switch (action.type) {
		case 'LOGIN_SUCCEEDED':
		case 'USER_CREATE_SUCCEEDED':
			return true;
		case 'LOGOUT':
		case 'LOGIN_REQUIRED':
			Auth.logout();
			return false;
		default:
			return authorized;
	}
}
