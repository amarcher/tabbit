export default function tabReducer(tabs = [], action) {
	switch (action.type) {
		case 'TAB_FETCH_SUCCEEDED':
			return action.tabs;
		case 'TAB_CREATE_SUCCEEDED':
			return [
				...tabs,
				action.tab,
			];
		default:
			return tabs;
	}
}
