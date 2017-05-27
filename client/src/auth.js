import { post, destroy, getAuthToken } from './ajax';

function setCookie(resp = {}) {
	const authToken = resp.auth_token || '';
	document.cookie = `auth_token=${authToken}; `;

	return resp;
}

const Auth = {
	login(credentials) {
		return post('/api/v1/sessions', credentials)
			.then(setCookie);
	},

	createUser(credentials) {
		return post('/api/v1/user/create', credentials)
			.then(setCookie);
	},

	logoutOnServer() {
		return destroy(`/api/v1/sessions/${getAuthToken()}`);
	},

	logout() {
		setCookie({
			auth_token: '',
		});
	},

	hasToken() {
		return !!getAuthToken();
	},
};

export default Auth;
