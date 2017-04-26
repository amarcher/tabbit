import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabPreview from './TabPreview';
import { getTabs, createTab } from '../actions/actionCreators';

export default class TabList extends Component {
	componentWillMount() {
		this.props.getTabs();
	}

	render() {
		const tabs = this.props.tabs.map(tab => <TabPreview key={tab.id} tab={tab} />);

		return (
			<div>
				{tabs}
				<button onClick={this.props.createTab}>New Tab</button>
			</div>
		);
	}
}

TabList.propTypes = {
	tabs: PropTypes.arrayOf(PropTypes.object),
	getTabs: PropTypes.func.isRequired,
	createTab: PropTypes.func.isRequired,
};

TabList.defaultProps = {
	tabs: [],
	getTabs,
	createTab,
};
