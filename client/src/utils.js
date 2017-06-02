const Utils = {
	formatDollar(number) {
		return `$${parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`;
	},

	formatPercent(number) {
		return `${Math.round((parseFloat(number) * 10000.0)) / 100}%`;
	},
};

module.exports = Utils;
