const Utils = {
	formatDollar(number) {
		return `$${parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`;
	},

	formatPercent(number) {
		return `${Math.round((parseFloat(number) * 10000.0)) / 100}%`;
	},

	readFile(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onloadend = () => {
				resolve(Utils.processFile(reader.result, file.type));
			};

			reader.onerror = () => {
				reject('There was an error reading the file!');
			};

			reader.readAsDataURL(file);
		});
	},

	processFile(dataURL, fileType) {
		return new Promise((resolve, reject) => {
			const maxWidth = 300;
			const maxHeight = 300;

			const image = new Image();
			image.src = dataURL;

			image.onload = () => {
				const width = image.width;
				const height = image.height;
				const shouldResize = (width > maxWidth) || (height > maxHeight);

				if (!shouldResize) {
					resolve(dataURL);
				}

				let newWidth;
				let newHeight;

				if (width > height) {
					newHeight = height * (maxWidth / width);
					newWidth = maxWidth;
				} else {
					newWidth = width * (maxHeight / height);
					newHeight = maxHeight;
				}

				const canvas = document.createElement('canvas');

				canvas.width = newWidth;
				canvas.height = newHeight;

				const context = canvas.getContext('2d');

				context.drawImage(image, 0, 0, newWidth, newHeight);

				const newDataURL = canvas.toDataURL(fileType);

				resolve(newDataURL);
			};

			image.onerror = () => {
				reject('There was an error processing your file!');
			};
		});
	},
};

module.exports = Utils;
