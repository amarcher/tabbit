import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { item } from '../propTypes';
import Item from './Item';

export default class TabEditor extends Component { // eslint-disable-line react/prefer-stateless-function
	render() {
		const items = this.props.items.map(tabItem => <Item key={tabItem.id} item={tabItem} />);

		return (
			<div>
				{items}
			</div>
		);
	}
}

TabEditor.propTypes = {
	items: PropTypes.arrayOf(item),
};

TabEditor.defaultProps = {
	items: [],
};
