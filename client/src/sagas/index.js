import { call, put, takeEvery } from 'redux-saga/effects';
import ajax from '../ajax';
import Auth from '../auth';

function isUnauthorized(resp) {
	const unauthorizedErrors = ['Invalid email or password', 'Unauthorized', 'Unprocessable Entity'];
	const hasUnauthorizedError = resp.errors && unauthorizedErrors.indexOf(resp.errors) > -1;
	const hasUnauthorizedStatus = [401, 422].indexOf(resp.status) > -1;

	return hasUnauthorizedStatus || hasUnauthorizedError;
}

function* getUser() {
	try {
		const resp = yield call(ajax.get.bind(undefined, '/api/v1/user'));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'USER_FETCH_SUCCEEDED',
			user: resp,
		});
	} catch (e) {
		yield put({
			type: 'USER_FETCH_FAILED',
			message: e.message,
		});
	}
}

function* getTabs() {
	try {
		const resp = yield call(ajax.get.bind(undefined, '/api/v1/tabs'));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'TABS_FETCH_SUCCEEDED',
			tabs: resp,
		});
	} catch (e) {
		yield put({
			type: 'TABS_FETCH_FAILED',
			message: e.message,
		});
	}
}

function* getTab(action) {
	try {
		const resp = yield call(ajax.get.bind(undefined, `/api/v1/tabs/${action.tabId}`));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'TAB_FETCH_SUCCEEDED',
			tab: resp,
		});
	} catch (e) {
		yield put({
			type: 'TAB_FETCH_FAILED',
			message: e.message,
		});
	}
}

function* createTab() {
	try {
		const resp = yield call(ajax.post.bind(undefined, '/api/v1/tabs'));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'TAB_CREATE_SUCCEEDED',
			tab: resp,
		});
	} catch (e) {
		yield put({
			type: 'TAB_CREATE_FAILED',
			message: e.message,
		});
	}
}

function* updateTab(action) {
	try {
		const resp = yield call(ajax.put.bind(undefined, `/api/v1/tabs/${action.tabId}`, action.changedTabProps));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'TAB_UPDATE_SUCCEEDED',
			tab: resp,
		});
	} catch (e) {
		yield put({
			type: 'TAB_UPDATE_FAILED',
			message: e.message,
		});
	}
}

function* login(action) {
	try {
		const resp = yield call(Auth.login.bind(undefined, action.credentials));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_FAILED',
			});

			return;
		}

		yield put({
			type: 'LOGIN_SUCCEEDED',
			user: resp,
		});
	} catch (e) {
		yield put({
			type: 'LOGIN_FAILED',
			message: e.message,
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
			message: e.message,
		});
	}
}

function* createUser(action) {
	try {
		const resp = yield call(Auth.createUser.bind(undefined, action.credentials));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'USER_CREATE_FAILED',
			});

			return;
		}

		yield put({
			type: 'USER_CREATE_SUCCEEDED',
			user: resp,
		});
	} catch (e) {
		yield put({
			type: 'USER_CREATE_FAILED',
			message: e.message,
		});
	}
}

function* createItem(action) {
	try {
		const resp = yield call(ajax.post.bind(undefined, `/api/v1/tabs/${action.tabId}/items`, action.item));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'ITEM_CREATE_SUCCEEDED',
			item: resp,
		});
	} catch (e) {
		yield put({
			type: 'ITEM_CREATE_FAILED',
			message: e.message,
		});
	}
}

function* deleteItem(action) {
	try {
		const resp = yield call(ajax.destroy.bind(undefined, `/api/v1/tabs/${action.tabId}/items/${action.item.id}`));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'ITEM_DELETE_SUCCEEDED',
			item: resp,
		});
	} catch (e) {
		yield put({
			type: 'ITEM_DELETE_FAILED',
			message: e.message,
		});
	}
}

function* tagItem(action) {
	try {
		const resp = yield call(ajax.put.bind(undefined, `/api/v1/tabs/${action.tabId}/items/${action.itemId}`, {
			rabbit_id: action.rabbitId,
		}));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'ITEM_TAG_SUCCEEDED',
			item: resp,
		});
	} catch (e) {
		yield put({
			type: 'ITEM_TAG_FAILED',
			message: e.message,
		});
	}
}

function* untagItem(action) {
	try {
		const resp = yield call(ajax.put.bind(undefined, `/api/v1/tabs/${action.tabId}/items/${action.itemId}`, {
			rabbit_id: action.rabbitId,
			remove: true,
		}));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'ITEM_UNTAG_SUCCEEDED',
			item: resp,
		});
	} catch (e) {
		yield put({
			type: 'ITEM_UNTAG_FAILED',
			message: e.message,
		});
	}
}

function* getRabbits() {
	try {
		const resp = yield call(ajax.get.bind(undefined, '/api/v1/rabbits'));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'RABBITS_FETCH_SUCCEEDED',
			rabbits: resp,
		});
	} catch (e) {
		yield put({
			type: 'RABBITS_FETCH_FAILED',
			message: e.message,
		});
	}
}

function* createRabbit(action) {
	try {
		const resp = yield call(ajax.post.bind(undefined, '/api/v1/rabbits', {
			...action.rabbit,
			tab_id: action.tabId,
		}));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'RABBIT_CREATE_SUCCEEDED',
			rabbit: resp.rabbit ? resp.rabbit : resp,
			tabId: resp.tab_id,
		});
	} catch (e) {
		yield put({
			type: 'RABBIT_CREATE_FAILED',
			message: e.message,
		});
	}
}

function* addRabbitToTab(action) {
	try {
		const uri = `/api/v1/tabs/${action.tabId}/rabbits/${action.rabbit.id}`;
		const resp = yield call(ajax.post.bind(undefined, uri));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'RABBIT_ADD_SUCCEEDED',
			rabbit: resp.rabbit,
			tabId: resp.tab_id,
		});
	} catch (e) {
		yield put({
			type: 'RABBIT_ADD_FAILED',
			message: e.message,
		});
	}
}

function* removeRabbitFromTab(action) {
	try {
		const uri = `/api/v1/tabs/${action.tabId}/rabbits/${action.rabbit.id}`;
		const resp = yield call(ajax.destroy.bind(undefined, uri));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'RABBIT_REMOVE_SUCCEEDED',
			rabbitId: resp.id,
			tabId: resp.tab_id,
		});
	} catch (e) {
		yield put({
			type: 'RABBIT_REMOVE_FAILED',
			message: e.message,
		});
	}
}

function* chargeRabbit(action) {
	try {
		const url = `/api/v1/tabs/${action.tabId}/rabbits/${action.rabbitId}/charge`;
		const resp = yield call(ajax.post.bind(undefined, url, {
			amount: action.amount,
		}));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGIN_REQUIRED',
			});

			return;
		}

		yield put({
			type: 'VENMO_CHARGE_RABBIT_SUCCEEDED',
			tabs: resp,
		});
	} catch (e) {
		yield put({
			type: 'VENMO_CHARGE_RABBIT_FAILED',
			message: e.message,
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
}

export default saga;
