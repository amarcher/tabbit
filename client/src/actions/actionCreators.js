export function getTabs() {
	return {
		type: 'TABS_FETCH_REQUESTED',
	};
}

export function getTab(tabId) {
	return {
		type: 'TAB_FETCH_REQUESTED',
		tabId,
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

export function logout() {
	return {
		type: 'LOGOUT',
	};
}

export function createUser(credentials) {
	return {
		type: 'USER_CREATE_REQUESTED',
		credentials,
	};
}

export function createItem(tabId, item) {
	return {
		type: 'ITEM_CREATE_REQUESTED',
		tabId,
		item,
	};
}

