function upsertAtIndex(item, items, index) {
	return [
		...items.splice(0, index),
		item,
		...items.splice(index + 1),
	];
}

export default function tabReducer(tabs = [], action) {
	switch (action.type) {
		case 'TABS_FETCH_SUCCEEDED':
			return action.tabs;
		case 'TAB_CREATE_SUCCEEDED':
			return [
				...tabs,
				action.tab,
			];
		case 'TAB_FETCH_SUCCEEDED': {
			const tabIndex = tabs.findIndex(tab => tab.id === action.tab.id);
			return upsertAtIndex(action.tab, tabs, tabIndex);
		}

		case 'ITEM_CREATE_SUCCEEDED': {
			const tabIndex = tabs.findIndex(tab => tab.id === action.item.tab_id);
			const newItems = [
				...tabs[tabIndex].items,
				action.item,
			];

			const newTab = Object.assign({}, tabs[tabIndex], {
				items: newItems,
			});

			return upsertAtIndex(newTab, tabs, tabIndex);
		}

		default:
			return tabs;
	}
}
