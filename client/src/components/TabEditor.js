import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { tab as tabProps } from '../propTypes';
import Item from './Item';
import ItemCreator from './ItemCreator';
import connect from '../connect';

class TabEditor extends Component { // eslint-disable-line react/prefer-stateless-function]
	componentWillMount() {
		if (!this.getItems().length) {
			this.props.getTab(this.getTabId());
		}
	}

	getTabId() {
		return parseInt(this.props.match.params.id, 10);
	}

	getTab() {
		return this.props.tabs.find(tab => tab.id === this.getTabId()) || {};
	}

	getItems() {
		return this.getTab().items || [];
	}

	renderItems() {
		return this.getItems().map(this.renderItem, this);
	}

	renderItem(item) {
		return (<Item {...this.props} key={item.id} item={item} tabId={this.getTabId()} />);
	}

	renderSubtotal() {
		const subtotal = this.getItems().reduce((subtotal, item) => subtotal + item.price, 0);

		if (subtotal) {
			return (
				<div>
					Subtotal: {subtotal}
				</div>
			);
		}

		return '';
	}

	render() {
		return (
			<div>
				{this.renderSubtotal()}
				{this.renderItems()}
				<ItemCreator {...this.props} tabId={this.getTabId()} />
			</div>
		);
	}
}

TabEditor.propTypes = {
	tabs: PropTypes.arrayOf(tabProps),
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	getTab: PropTypes.func.isRequired,
};

TabEditor.defaultProps = {
	tabs: [],
};

export default connect(TabEditor);
