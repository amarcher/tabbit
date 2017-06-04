export default function userReducer(user = {}, action) {
	switch (action.type) {
		case 'LOGIN_SUCCEEDED':
		case 'USER_CREATE_SUCCEEDED':
		case 'USER_FETCH_SUCCEEDED':
			return action.user;

		default:
			return user;
	}
}
