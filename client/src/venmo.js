const VENMO_BASE_URI = 'https://api.venmo.com/v1/oauth/authorize';
const VENMO_SCOPES = ['make_payments', 'access_profile', 'access_email', 'access_phone', 'access_balance'];
const VENMO_REDIRECT_URI_BASE = 'http://localhost:3001/venmo/';
const VENMO_CLIENT_ID = '2106';
const VENMO_CGI_PARAMS = `client_id=${VENMO_CLIENT_ID}&scope=${VENMO_SCOPES.join('%20')}&response_type=code`;

const POPUP_WIDTH = 450;
const POPUP_HEIGHT = 600;
const POPUP_PARAMS = 'menubar=no,location=no,resizable=no,scrollbars=no,status=no';

let popUp;

function checkForToken(callback, event) {
	const user = event.data && JSON.parse(event.data);

	if (user && user.vm_authtoken) {
		popUp.close();
		callback(user);
	}
}

export function getPopUpParams() {
	const screenWidth = screen.width;
	const screenHeight = screen.height;
	const left = (screenWidth / 2.0) - (POPUP_WIDTH / 2.0);
	const top = (screenHeight / 2.0) - (POPUP_HEIGHT / 2.0);
	return `${POPUP_PARAMS},width=${POPUP_WIDTH},height=${POPUP_HEIGHT},top=${top},left=${left}`;
}

export function getVenmoURI(userId) {
	return `${VENMO_BASE_URI}?${VENMO_CGI_PARAMS}&redirect_uri=${VENMO_REDIRECT_URI_BASE}${userId}/`;
}

export function authVenmo(userId) {
	return new Promise((resolve) => {
		window.addEventListener('message', checkForToken.bind(undefined, resolve), false);
		popUp = window.open(getVenmoURI(userId), 'Venmo', getPopUpParams());
	});
}

export default authVenmo;
