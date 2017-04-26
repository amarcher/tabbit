export function getTabs() {
	return {
		type: 'TAB_FETCH_REQUESTED',
	};
}

export function createTab() {
	return {
		type: 'TAB_CREATE_REQUESTED',
	};
}

export function login(credentials) {
	return {
		type: 'LOGIN_REQUESTED',
		credentials,
	};
}
