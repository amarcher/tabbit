import PropTypes from 'prop-types';

export const item = PropTypes.shape({
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	tab: PropTypes.number,
});

export const tab = PropTypes.shape({
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	date: PropTypes.string,
	text: PropTypes.string,
	url: PropTypes.string,
	img_url: PropTypes.string,
	user: PropTypes.number,
});
