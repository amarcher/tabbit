function upsert(itemToUpsert, items) {
	const index = items.findIndex(item => item.id === itemToUpsert.id);

	return [
		...items.slice(0, index),
		itemToUpsert,
		...items.slice(index + 1),
	];
}

function remove(itemToRemove, items) {
	const index = items.findIndex(item => item.id === itemToRemove.id);

	return [
		...items.slice(0, index),
		...items.slice(index + 1),
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
			return upsert(action.tab, tabs);
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

			return upsert(newTab, tabs);
		}

		case 'ITEM_DELETE_SUCCEEDED': {
			const tabIndex = tabs.findIndex(tab => tab.id === action.item.tab_id);
			let newTab = Object.assign({}, tabs[tabIndex]);
			let newItems = [...newTab.items];
			newItems = remove(action.item, newItems);
			newTab = Object.assign({}, tabs[tabIndex], {
				items: newItems,
			});
			return upsert(newTab, tabs);
		}

		default:
			return tabs;
	}
}
