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
		type: 'LOGOUT_REQUESTED',
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

export function deleteItem(tabId, item) {
	return {
		type: 'ITEM_DELETE_REQUESTED',
		tabId,
		item,
	};
}

export function getRabbits() {
	return {
		type: 'RABBITS_FETCH_REQUESTED',
	};
}

export function createRabbit(tabId, rabbit) {
	return {
		type: 'RABBIT_CREATE_REQUESTED',
		tabId,
		rabbit,
	};
}

export function addRabbitToTab(tabId, rabbit) {
	return {
		type: 'RABBIT_ADD_REQUESTED',
		tabId,
		rabbit,
	};
}

export function removeRabbitFromTab(tabId, rabbit) {
	return {
		type: 'RABBIT_REMOVE_REQUESTED',
		tabId,
		rabbit,
	};
}

