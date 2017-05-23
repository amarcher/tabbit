import { call, put, takeEvery } from 'redux-saga/effects';
import ajax from '../ajax';
import Auth from '../auth';

function isUnauthorized(resp) {
	return resp.errors && resp.errors === 'Unauthorized';
}

function* getTabs() {
	try {
		const resp = yield call(ajax.get.bind(undefined, '/api/v1/tabs'));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGOUT',
			});
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
				type: 'LOGOUT',
			});
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
				type: 'LOGOUT',
			});
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

function* login(action) {
	try {
		yield call(Auth.login.bind(undefined, action.credentials));
		yield put({
			type: 'LOGIN_SUCCEEDED',
		});
	} catch (e) {
		yield put({
			type: 'LOGIN_FAILED',
			message: e.message,
		});
	}
}

function* createUser(action) {
	try {
		yield call(Auth.createUser.bind(undefined, action.credentials));
		yield put({
			type: 'USER_CREATE_SUCCEEDED',
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
				type: 'LOGOUT',
			});
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
		const resp = yield call(ajax.delete.bind(undefined, `/api/v1/tabs/${action.tabId}/items/${action.item.id}`));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGOUT',
			});
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

function* createRabbit(action) {
	try {
		const resp = yield call(ajax.post.bind(undefined, '/api/v1/rabbits', {
			...action.rabbit,
			tab_id: action.tabId,
		}));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGOUT',
			});
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

function* removeRabbitFromTab(action) {
	try {
		const uri = `/api/v1/tabs/${action.tabId}/rabbits/${action.rabbit.id}`;
		const resp = yield call(ajax.delete.bind(undefined, uri));

		if (isUnauthorized(resp)) {
			yield put({
				type: 'LOGOUT',
			});
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

function* saga() {
	yield takeEvery('TABS_FETCH_REQUESTED', getTabs);
	yield takeEvery('TAB_FETCH_REQUESTED', getTab);
	yield takeEvery('TAB_CREATE_REQUESTED', createTab);
	yield takeEvery('LOGIN_REQUESTED', login);
	yield takeEvery('USER_CREATE_REQUESTED', createUser);
	yield takeEvery('ITEM_CREATE_REQUESTED', createItem);
	yield takeEvery('ITEM_DELETE_REQUESTED', deleteItem);
	yield takeEvery('RABBIT_CREATE_REQUESTED', createRabbit);
	yield takeEvery('RABBIT_REMOVE_REQUESTED', removeRabbitFromTab);
}

export default saga;
