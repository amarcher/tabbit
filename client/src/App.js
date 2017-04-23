import React, { Component } from 'react';
import './app.css';

class App extends Component {
	render() {
		return (
			<div>
				{React.cloneElement(this.props.children, this.props)}
			</div>
		);
	}
}

export default App;
