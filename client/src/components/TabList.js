import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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

	componentWillMount() {
		if (!this.props.tabs.length) {
			this.props.getTabs();
		}
	}

	componentWillUpdate(nextProps) {
		if (this.state.creatingNewTab && (nextProps.tabs.length > this.props.tabs.length)) {
			const newlyCreatedTab = nextProps.tabs[nextProps.tabs.length - 1];
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
				<Button onClick={this.onCreateNewTab}>New Tab</Button>
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
