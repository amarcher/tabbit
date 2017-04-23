import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
	render() {
		return (
			<div>
				{React.cloneElement(this.props.children, this.props)}
			</div>
		);
	}
}
