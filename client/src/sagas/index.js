import { call, put, takeEvery } from 'redux-saga/effects';
import ajax from '../ajax';
import Auth from '../auth';

function getErrors(e) {
	return e.errors || e.statusText || e.message;
}

function* getUser() {
	try {
		const resp = yield call(ajax.get.bind(undefined, '/api/v1/user'));

		yield put({
			type: 'USER_FETCH_SUCCEEDED',
			user: resp,
		});
	} catch (e) {
		yield put({
			type: 'USER_FETCH_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* getTabs() {
	try {
		const resp = yield call(ajax.get.bind(undefined, '/api/v1/tabs'));

		yield put({
			type: 'TABS_FETCH_SUCCEEDED',
			tabs: resp,
		});
	} catch (e) {
		yield put({
			type: 'TAB_FETCH_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* getTab(action) {
	try {
		const resp = yield call(ajax.get.bind(undefined, `/api/v1/tabs/${action.tabId}`));

		yield put({
			type: 'TAB_FETCH_SUCCEEDED',
			tab: resp,
		});
	} catch (e) {
		yield put({
			type: 'TAB_FETCH_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* createTab() {
	try {
		const resp = yield call(ajax.post.bind(undefined, '/api/v1/tabs'));

		yield put({
			type: 'TAB_CREATE_SUCCEEDED',
			tab: resp,
		});
	} catch (e) {
		yield put({
			type: 'TAB_CREATE_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* updateTab(action) {
	try {
		const resp = yield call(ajax.put.bind(undefined, `/api/v1/tabs/${action.tabId}`, action.changedTabProps));

		yield put({
			type: 'TAB_UPDATE_SUCCEEDED',
			tab: resp,
		});
	} catch (e) {
		yield put({
			type: 'TAB_UPDATE_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* login(action) {
	try {
		const resp = yield call(Auth.login.bind(undefined, action.credentials));

		yield put({
			type: 'LOGIN_SUCCEEDED',
			user: resp,
		});
	} catch (e) {
		yield put({
			type: 'LOGIN_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* logout() {
	try {
		yield call(Auth.logoutOnServer);

		yield put({
			type: 'LOGOUT_SUCCEEDED',
		});
	} catch (e) {
		yield put({
			type: 'LOGOUT_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* createUser(action) {
	try {
		const resp = yield call(Auth.createUser.bind(undefined, action.credentials));

		yield put({
			type: 'USER_CREATE_SUCCEEDED',
			user: resp,
		});
	} catch (e) {
		yield put({
			type: 'USER_CREATE_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* createItem(action) {
	try {
		const resp = yield call(ajax.post.bind(undefined, `/api/v1/tabs/${action.tabId}/items`, action.item));

		yield put({
			type: 'ITEM_CREATE_SUCCEEDED',
			item: resp,
		});
	} catch (e) {
		yield put({
			type: 'ITEM_CREATE_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* deleteItem(action) {
	try {
		const resp = yield call(ajax.destroy.bind(undefined, `/api/v1/tabs/${action.tabId}/items/${action.item.id}`));

		yield put({
			type: 'ITEM_DELETE_SUCCEEDED',
			item: resp,
		});
	} catch (e) {
		yield put({
			type: 'ITEM_DELETE_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* tagItem(action) {
	try {
		const resp = yield call(ajax.put.bind(undefined, `/api/v1/tabs/${action.tabId}/items/${action.itemId}`, {
			rabbit_id: action.rabbitId,
		}));

		yield put({
			type: 'ITEM_TAG_SUCCEEDED',
			item: resp,
		});
	} catch (e) {
		yield put({
			type: 'ITEM_TAG_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* untagItem(action) {
	try {
		const resp = yield call(ajax.put.bind(undefined, `/api/v1/tabs/${action.tabId}/items/${action.itemId}`, {
			rabbit_id: action.rabbitId,
			remove: true,
		}));

		yield put({
			type: 'ITEM_UNTAG_SUCCEEDED',
			item: resp,
		});
	} catch (e) {
		yield put({
			type: 'ITEM_UNTAG_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* getRabbits() {
	try {
		const resp = yield call(ajax.get.bind(undefined, '/api/v1/rabbits'));

		yield put({
			type: 'RABBITS_FETCH_SUCCEEDED',
			rabbits: resp,
		});
	} catch (e) {
		yield put({
			type: 'RABBITS_FETCH_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* createRabbit(action) {
	try {
		const resp = yield call(ajax.post.bind(undefined, '/api/v1/rabbits', {
			...action.rabbit,
			tab_id: action.tabId,
		}));

		yield put({
			type: 'RABBIT_CREATE_SUCCEEDED',
			rabbit: resp.rabbit ? resp.rabbit : resp,
			tabId: resp.tab_id,
		});
	} catch (e) {
		yield put({
			type: 'RABBIT_CREATE_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* addRabbitToTab(action) {
	try {
		const uri = `/api/v1/tabs/${action.tabId}/rabbits/${action.rabbit.id}`;
		const resp = yield call(ajax.post.bind(undefined, uri));

		yield put({
			type: 'RABBIT_ADD_SUCCEEDED',
			rabbit: resp.rabbit,
			tabId: resp.tab_id,
		});
	} catch (e) {
		yield put({
			type: 'RABBIT_ADD_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* removeRabbitFromTab(action) {
	try {
		const uri = `/api/v1/tabs/${action.tabId}/rabbits/${action.rabbit.id}`;
		const resp = yield call(ajax.destroy.bind(undefined, uri));

		yield put({
			type: 'RABBIT_REMOVE_SUCCEEDED',
			rabbitId: resp.id,
			tabId: resp.tab_id,
		});
	} catch (e) {
		yield put({
			type: 'RABBIT_REMOVE_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* chargeRabbit(action) {
	try {
		const url = `/api/v1/tabs/${action.tabId}/rabbits/${action.rabbitId}/charge`;
		const resp = yield call(ajax.post.bind(undefined, url, {
			amount: action.amount,
		}));

		yield put({
			type: 'VENMO_CHARGE_RABBIT_SUCCEEDED',
			tabs: resp,
		});
	} catch (e) {
		yield put({
			type: 'VENMO_CHARGE_RABBIT_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* unlinkVenmo() {
	try {
		const resp = yield call(ajax.destroy.bind(undefined, '/api/v1/user/venmo'));

		yield put({
			type: 'VENMO_UNLINK_SUCCEEDED',
			user: resp,
		});
	} catch (e) {
		yield put({
			type: 'VENMO_UNLINK_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* runOCR(action) {
	try {
		const resp = yield call(ajax.post.bind(undefined, `/api/v1/tabs/${action.tabId}/image`, {
			image: action.dataURL,
		}));

		yield put({
			type: 'OCR_SUCCEEDED',
			tab: resp,
		});
	} catch (e) {
		yield put({
			type: 'OCR_FAILED',
			errors: getErrors(e),
			status: e.status,
		});
	}
}

function* saga() {
	yield takeEvery('USER_FETCH_REQUESTED', getUser);
	yield takeEvery('TABS_FETCH_REQUESTED', getTabs);
	yield takeEvery('TAB_FETCH_REQUESTED', getTab);
	yield takeEvery('TAB_CREATE_REQUESTED', createTab);
	yield takeEvery('TAB_UPDATE_REQUESTED', updateTab);
	yield takeEvery('LOGIN_REQUESTED', login);
	yield takeEvery('LOGOUT_REQUESTED', logout);
	yield takeEvery('USER_CREATE_REQUESTED', createUser);
	yield takeEvery('ITEM_CREATE_REQUESTED', createItem);
	yield takeEvery('ITEM_DELETE_REQUESTED', deleteItem);
	yield takeEvery('ITEM_TAG_REQUESTED', tagItem);
	yield takeEvery('ITEM_UNTAG_REQUESTED', untagItem);
	yield takeEvery('RABBITS_FETCH_REQUESTED', getRabbits);
	yield takeEvery('RABBIT_CREATE_REQUESTED', createRabbit);
	yield takeEvery('RABBIT_ADD_REQUESTED', addRabbitToTab);
	yield takeEvery('RABBIT_REMOVE_REQUESTED', removeRabbitFromTab);
	yield takeEvery('VENMO_CHARGE_RABBIT_REQUESTED', chargeRabbit);
	yield takeEvery('VENMO_UNLINK_REQUESTED', unlinkVenmo);
	yield takeEvery('OCR_REQUESTED', runOCR);
}

export default saga;
