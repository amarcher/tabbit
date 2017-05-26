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

export default function rabbitReducer(rabbits = [], action) {
	switch (action.type) {
		case 'RABBITS_FETCH_SUCCEEDED':
			return action.rabbits;
		case 'RABBIT_CREATE_SUCCEEDED':
			return upsert(action.rabbit, rabbits);
		case 'TAB_FETCH_SUCCEEDED':
			if (action.tab.rabbits) {
				return action.tab.rabbits.reduce((newRabbits, rabbit) => upsert(rabbit, newRabbits), [...rabbits]);
			}

			return rabbits;

		default:
			return rabbits;
	}
}
