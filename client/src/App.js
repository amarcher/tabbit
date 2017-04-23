import React from 'react';
import PropTypes from 'prop-types';
import './app.css';

function App(props) {
	return (
		<div>
			{React.cloneElement(props.children, props)}
		</div>
	);
}


App.propTypes = {
	children: PropTypes.element.isRequired,
};


export default App;
