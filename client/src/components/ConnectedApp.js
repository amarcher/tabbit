import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import App from '../App';

function mapStateToProps(state) {
	return {
    // state_i_need: state.state_i_need
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators,dispatch);
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
