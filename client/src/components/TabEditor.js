import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { tab } from '../propTypes';
import Item from './Item';
import ItemCreator from './ItemCreator';
import connect from '../connect';

class TabEditor extends Component { // eslint-disable-line react/prefer-stateless-function
	componentWillMount() {
		const currentTab = this.getTab();

		if (!currentTab || !currentTab.items) {
			this.props.getTab(this.getTabId());
		}
	}

	getTabId() {
		return parseInt(this.props.match.params.id, 10);
	}

	getTab() {
		const tabId = this.getTabId();
		return this.props.tabs.find(t => t.id === tabId);
	}

	renderItems() {
		const currentTab = this.getTab();
		const items = (currentTab && currentTab.items) || [];

		return items.map(this.renderItem, this);
	}

	renderItem(item) {
		return (<Item {...this.props} key={item.id} item={item} tabId={this.getTabId()} />);
	}

	render() {
		return (
			<div>
				{this.renderItems()}
				<ItemCreator {...this.props} tabId={this.getTabId()} />
			</div>
		);
	}
}

TabEditor.propTypes = {
	tabs: PropTypes.arrayOf(tab),
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
