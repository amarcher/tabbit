import { post } from './ajax';

function setCookie(resp) {
	document.cookie = `auth_token=${resp.auth_token}; `;
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

	logout() {
		setCookie({
			auth_token: '',
		});
	},
};

export default Auth;
