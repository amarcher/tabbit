function upsert(itemToUpsert, items) {
	const index = items.findIndex(item => item.id === itemToUpsert.id);

	if (index === -1) {
		return [
			...items,
			itemToUpsert,
		];
	}

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
		case 'TAB_UPDATE_SUCCEEDED':
		case 'TAB_FETCH_SUCCEEDED':
			return upsert(action.tab, tabs);

		case 'ITEM_CREATE_SUCCEEDED':
		case 'ITEM_TAG_SUCCEEDED':
		case 'ITEM_UNTAG_SUCCEEDED': {
			const tabToUpdate = tabs.find(tab => tab.id === action.item.tab_id);
			const newItems = upsert(action.item, tabToUpdate.items);
			const newTab = { ...tabToUpdate, items: newItems };
			return upsert(newTab, tabs);
		}

		case 'ITEM_DELETE_SUCCEEDED': {
			const tabToUpdate = tabs.find(tab => tab.id === action.item.tab_id);
			const newItems = remove(action.item, tabToUpdate.items);
			const newTab = { ...tabToUpdate, items: newItems };
			return upsert(newTab, tabs);
		}

		case 'RABBIT_ADD_SUCCEEDED': {
			const tabToUpdate = tabs.find(tab => tab.id === action.tabId);
			const newRabbits = upsert(action.rabbit, tabToUpdate.rabbits);
			const newTab = { ...tabToUpdate, rabbits: newRabbits };
			return upsert(newTab, tabs);
		}

		case 'RABBIT_REMOVE_SUCCEEDED': {
			const tabToUpdate = tabs.find(tab => tab.id === action.tabId);
			const rabbitToRemove = tabToUpdate.rabbits.find(rabbit => rabbit.id === action.rabbitId);
			const newRabbits = remove(rabbitToRemove, tabToUpdate.rabbits);
			const newItems = tabToUpdate.items.map(item => ({
				...item,
				rabbits: remove(rabbitToRemove, item.rabbits),
			}));
			const newTab = { ...tabToUpdate, rabbits: newRabbits, items: newItems };
			return upsert(newTab, tabs);
		}

		case 'RABBIT_CREATE_SUCCEEDED': {
			if (action.tabId) {
				const tabToUpdate = tabs.find(tab => tab.id === action.tabId);
				const newRabbits = upsert(action.rabbit, tabToUpdate.rabbits);
				const newTab = { ...tabToUpdate, rabbits: newRabbits };
				return upsert(newTab, tabs);
			}

			return tabs;
		}

		default:
			return tabs;
	}
}
