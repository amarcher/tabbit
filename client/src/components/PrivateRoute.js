import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import connect from '../connect';

const PrivateRoute = ({ component: Component, authorized, ...rest }) => {
	const render = (props) => {
		console.log(props.location);
		if (authorized) {
			return (
				<Component {...props} />
			);
		}

		return (
			<Redirect
				to={{
					pathname: '/login',
					state: { from: props.location },
				}}
			/>
		);
	};

	return (
		<Route {...rest} render={render} />
	);
};

PrivateRoute.propTypes = {
	component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
	authorized: PropTypes.bool.isRequired,
};

export default connect(PrivateRoute);
