export function getUser() {
	return {
		type: 'USER_FETCH_REQUESTED',
	};
}

export function userFetchSucceeded(user) {
	return {
		type: 'USER_FETCH_SUCCEEDED',
		user,
	};
}

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

export function updateTab(tabId, changedTabProps) {
	return {
		type: 'TAB_UPDATE_REQUESTED',
		tabId,
		changedTabProps,
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

export function tagItem(tabId, itemId, rabbitId) {
	return {
		type: 'ITEM_TAG_REQUESTED',
		tabId,
		itemId,
		rabbitId,
	};
}

export function untagItem(tabId, itemId, rabbitId) {
	return {
		type: 'ITEM_UNTAG_REQUESTED',
		tabId,
		itemId,
		rabbitId,
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

export function chargeRabbit(tabId, rabbitId, amount) {
	return {
		type: 'VENMO_CHARGE_RABBIT_REQUESTED',
		tabId,
		rabbitId,
		amount,
	};
}

export function unlinkVenmo() {
	return {
		type: 'VENMO_UNLINK_REQUESTED',
	};
}

export function runOCR(tabId, dataURL) {
	return {
		type: 'OCR_REQUESTED',
		tabId,
		dataURL,
	};
}

export function clearErrors() {
	return {
		type: 'CLEAR_ERRORS',
	};
}
