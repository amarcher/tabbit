import React, { Component } from 'react';
import { Link } from 'react-router';
import { tab } from '../propTypes';

export default class TabPreview extends Component { // eslint-disable-line react/prefer-stateless-function
	render() {
		return (
			<div>
				<Link to={`/tab/${this.props.tab.id}/edit`}>
					<span>{this.props.tab.name}</span>
				</Link>
			</div>
		);
	}
}

TabPreview.propTypes = {
	tab: tab.isRequired,
};
