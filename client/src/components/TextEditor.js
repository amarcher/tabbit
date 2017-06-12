import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			text: this.props.originalText,
		};
		this.bindEventHandlers();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.originalText !== this.props.originalText) {
			this.setState({
				text: nextProps.originalText,
			});
		}
	}

	onStaticTextClick() {
		this.setState({
			active: true,
		});
	}

	onChange(e) {
		this.setState({
			text: e.target.value,
		});
	}

	onSubmitText(e) {
		if (e.keyCode === 13) {
			this.props.updateText(this.state.text);
			this.setState({
				active: false,
			});
		}

		if (e.keyCode === 27) {
			this.setState({
				active: false,
				text: this.props.originalText,
			});
		}
	}

	bindEventHandlers() {
		this.onStaticTextClick = this.onStaticTextClick.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmitText = this.onSubmitText.bind(this);
	}

	render() {
		if (this.state.active === true) {
			return (
				<input defaultValue={this.state.text} onChange={this.onChange} onKeyDown={this.onSubmitText} />
			);
		}

		return (
			<button onClick={this.onStaticTextClick}>
				{this.state.text}
			</button>
		);
	}
}

TextEditor.propTypes = {
	updateText: PropTypes.func.isRequired,
	originalText: PropTypes.string,
};

TextEditor.defaultProps = {
	originalText: '',
};
