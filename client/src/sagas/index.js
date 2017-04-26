import { call, put, takeEvery } from 'redux-saga/effects';
import ajax from '../ajax';
import { history } from '../store';
import Auth from '../auth';

function* getTabs() {
	try {
		const resp = yield call(ajax.get.bind(undefined, '/api/v1/tabs'));
		yield put({
			type: 'TAB_FETCH_SUCCEEDED',
			tabs: resp,
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

function* saga() {
	yield takeEvery('TAB_FETCH_REQUESTED', getTabs);
	yield takeEvery('TAB_CREATE_REQUESTED', createTab);
	yield takeEvery('LOGIN_REQUESTED', login);
}

export default saga;
