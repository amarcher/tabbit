import React, { Component } from 'react';
import { tab } from '../propTypes';

export default class TabPreview extends Component { // eslint-disable-line react/prefer-stateless-function
	render() {
		return (
			<div>
				<span>{this.props.tab.name}</span>
			</div>
		);
	}
}

TabPreview.propTypes = {
	tab: tab.isRequired,
};
