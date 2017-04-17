import 'whatwg-fetch';

function stringify(params) {
	return Object.keys(params).map(key => {
		return `${key}=${params[key]}`;
	}).join('&');
}

const Ajax = {
	get(url, params = {}) {
		return fetch(`${url}?${stringify(params)}`)
			.then(resp => resp.json());
	},

	post(url, params = {}) {
		return fetch(url, {
			method: 'post',
			headers: {
		      'Content-Type': 'application/json',
		      'Accept': 'application/json'
		    },
			body: JSON.stringify(params)
		}).then(resp => resp.json());
	}
};

module.exports = Ajax;
