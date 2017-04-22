import { post } from './ajax';

function setCookie(resp) {
	document.cookie = `auth_token=${resp.auth_token}; `;
}

const Auth = {
	login(credentials) {
		return post('/api/v1/sessions', credentials)
			.then(setCookie)
			.catch(console.log); // eslint-disable-line no-console
	},

	logout() {
		setCookie({
			auth_token: '',
		});
	},
};

export default Auth;
