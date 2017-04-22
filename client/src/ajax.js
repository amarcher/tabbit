import 'whatwg-fetch';

function serialize(params) {
	return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}

const Ajax = {
	get(url, params = {}) {
		return fetch(`${url}?${serialize(params)}`)
			.then(resp => resp.json());
	},

	post(url, params = {}) {
		return fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(params),
		}).then(resp => resp.json());
	},
};

module.exports = Ajax;
