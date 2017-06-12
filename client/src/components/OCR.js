import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { readFile } from '../utils';

class OCR extends Component {
	componentWillMount() {
		this.state = {
			dataURL: undefined,
			file: undefined,
		};

		this.bindEventHandlers();
	}

	onSubmit() {
		const { dataURL } = this.state;

		this.props.runOCR(dataURL);
	}

	onImageSelected(e) {
		const file = e.target.files[0];

		readFile(file).then((dataURL) => {
			this.setState({
				file,
				dataURL,
			});
		});
	}

	bindEventHandlers() {
		this.onImageSelected = this.onImageSelected.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	renderImagePreview() {
		const { dataURL } = this.state;

		const style = {
			maxWidth: '300px',
			maxHeight: '300px',
		};

		return dataURL ? (
			<div>
				<button type="button" onClick={this.onSubmit}>Submit</button>
				<div>
					<img src={dataURL} style={style} alt="Receipt" />
				</div>
			</div>
		) : '';
	}

	render() {
		return (
			<div>
				<input type="file" accept="image/*" onChange={this.onImageSelected} />
				{this.renderImagePreview()}
			</div>
		);
	}
}

OCR.propTypes = {
	runOCR: PropTypes.func.isRequired,
};

export default OCR;
