import 'whatwg-fetch';

function serialize(params) {
	return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}

function readCookie(cookie) {
	if (!cookie) return {};

	return cookie.split('; ').reduce((params, keyValue) => {
		const keyValuePair = keyValue.split('=');
		params[keyValuePair[0]] = keyValuePair[1]; // eslint-disable-line no-param-reassign
		return params;
	}, {});
}

function getAuthToken() {
	return readCookie(document.cookie).auth_token;
}

const Ajax = {
	get(url, params = {}) {
		return fetch(`${url}?${serialize(params)}`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: getAuthToken(),
			},
		}).then(resp => resp.json());
	},

	post(url, params = {}) {
		return fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: getAuthToken(),
			},
			body: JSON.stringify(params),
		}).then(resp => resp.json());
	},

	destroy(url, params = {}) {
		return fetch(url, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: getAuthToken(),
			},
			body: JSON.stringify(params),
		}).then(resp => resp.json());
	},

	getAuthToken,
};

module.exports = Ajax;
