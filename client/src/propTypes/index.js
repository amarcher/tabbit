import PropTypes from 'prop-types';

export const item = PropTypes.shape({
	id: PropTypes.number.isRequired,
	name: PropTypes.string,
	price: PropTypes.number,
	tab: PropTypes.number,
});

export const rabbit = PropTypes.shape({
	id: PropTypes.number.isRequired,
	name: PropTypes.string,
	email: PropTypes.string,
	phone_number: PropTypes.string,
	user: PropTypes.number,
});

export const tab = PropTypes.shape({
	id: PropTypes.number.isRequired,
	name: PropTypes.string,
	date: PropTypes.string,
	text: PropTypes.string,
	url: PropTypes.string,
	img_url: PropTypes.string,
	user: PropTypes.number,
});
