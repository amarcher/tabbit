function getErrorsForAction({ errors }) {
	if (!errors) {
		return [];
	}

	return (typeof errors === 'string') ? [errors] : errors;
}

export default function errorsReducer(errors = {}, action) {
	if (action.type === 'CLEAR_ERRORS') {
		return {};
	}

	const errorsForAction = getErrorsForAction(action);

	if (!errorsForAction.length) {
		return errors;
	}

	return {
		...errors,
		[action.type]: errorsForAction,
	};
}
