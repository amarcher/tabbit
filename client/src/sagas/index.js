import { call, put, takeEvery } from 'redux-saga/effects';
import ajax from '../ajax';
import { history } from '../store';
import Auth from '../auth';

function* getTabs() {
	try {
		const resp = yield call(ajax.get.bind(undefined, '/api/v1/tabs'));
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
		history.push(`/tab/${resp.id}/edit`);
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
		history.push('/tabs');
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
		history.push('/tabs');
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

function* saga() {
	yield takeEvery('TABS_FETCH_REQUESTED', getTabs);
	yield takeEvery('TAB_FETCH_REQUESTED', getTab);
	yield takeEvery('TAB_CREATE_REQUESTED', createTab);
	yield takeEvery('LOGIN_REQUESTED', login);
	yield takeEvery('USER_CREATE_REQUESTED', createUser);
	yield takeEvery('ITEM_CREATE_REQUESTED', createItem);
}

export default saga;
