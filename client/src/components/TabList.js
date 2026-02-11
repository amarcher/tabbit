import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabPreview from './TabPreview';
import connect from '../connect';

class TabList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			creatingNewTab: false,
		};

		this.bindEventHandlers();
	}

	componentDidMount() {
		this.props.getTabs();
	}

	componentDidUpdate(prevProps) {
		if (this.state.creatingNewTab && (this.props.tabs.length > prevProps.tabs.length)) {
			const newlyCreatedTab = this.props.tabs[this.props.tabs.length - 1];
			this.props.history.push(`/tab/${newlyCreatedTab.id}/edit`);
		}
	}

	onCreateNewTab() {
		this.setState({ creatingNewTab: true });
		this.props.createTab();
	}

	bindEventHandlers() {
		this.onCreateNewTab = this.onCreateNewTab.bind(this);
	}

	render() {
		const tabs = this.props.tabs.map(tab => <TabPreview key={tab.id} tab={tab} />);

		return (
			<div>
				{tabs}
				<button onClick={this.onCreateNewTab}>New Tab</button>
			</div>
		);
	}
}

TabList.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
	tabs: PropTypes.arrayOf(PropTypes.object),
	getTabs: PropTypes.func.isRequired,
	createTab: PropTypes.func.isRequired,
};

TabList.defaultProps = {
	tabs: [],
};

export default connect(TabList);
