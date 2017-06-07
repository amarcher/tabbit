import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { tab as tabProps, rabbit as rabbitProps } from '../propTypes';
import Item from './Item';
import Rabbit from './Rabbit';
import RabbitAdder from './RabbitAdder';
import ItemCreator from './ItemCreator';
import connect from '../connect';
import { formatDollar, formatPercent } from '../utils';

const DEFAULT_TAX_RATE = 0.0875;
const DEFAULT_TIP_RATE = 0.18;

class TabEditor extends Component {
	componentWillMount() {
		this.props.getRabbits();

		const tab = this.getTab();

		this.state = {
			activeRabbitId: undefined,
			taxRate: (tab.tax_rate && parseFloat(tab.tax_rate, 10)) || DEFAULT_TAX_RATE,
			tipRate: (tab.tip_rate && parseFloat(tab.tip_rate, 10)) || DEFAULT_TIP_RATE,
			editingTaxAndTipRate: false,
		};

		if (!this.getItems().length) {
			this.props.getTab(this.getTabId());
		}

		this.bindEventHandlers();
	}

	componentWillReceiveProps(nextProps) {
		const prevTab = this.getTab();
		const nextTab = nextProps.tabs.find(tab => tab.id === parseInt(nextProps.match.params.id, 10));

		if (nextTab && (nextTab.tax_rate !== prevTab.tax_rate || nextTab.tip_rate !== prevTab.tip_rate)) {
			const tipRate = parseFloat(nextTab.tip_rate, 10);
			const taxRate = parseFloat(nextTab.tax_rate, 10);

			this.setState({
				tipRate,
				taxRate,
			});
		}
	}

	onBeginEditTaxAndTipRate() {
		this.setState({
			editingTaxAndTipRate: true,
		});
	}

	onMakeRabbitActive(rabbitId) {
		this.setState({
			activeRabbitId: rabbitId,
		});
	}

	onTagItem(item) {
		const { activeRabbitId } = this.state;

		if (!activeRabbitId) {
			return;
		}

		if (item.rabbits && item.rabbits.map(rabbit => rabbit.id).indexOf(activeRabbitId) > -1) {
			this.props.untagItem(this.getTabId(), item.id, activeRabbitId);
		} else {
			this.props.tagItem(this.getTabId(), item.id, activeRabbitId);
		}
	}

	onTaxRateChange(event) {
		const taxRate = parseFloat(event.target.value, 10);

		this.setState({
			taxRate,
		});
	}

	onTipRateChange(event) {
		const tipRate = parseFloat(event.target.value, 10);

		this.setState({
			tipRate,
		});
	}

	onSubmitTaxAndTipRate() {
		const { taxRate, tipRate } = this.state;
		const tabId = this.getTabId();

		this.props.updateTab(tabId, {
			tax_rate: taxRate,
			tip_rate: tipRate,
		});

		this.setState({
			editingTaxAndTipRate: false,
		});
	}

	getTabId() {
		return parseInt(this.props.match.params.id, 10);
	}

	getTab() {
		return this.props.tabs.find(tab => tab.id === this.getTabId()) || {};
	}

	getItems() {
		return this.getTab().items || [];
	}

	getRabbits() {
		return this.getTab().rabbits || [];
	}

	getTabSubtotal() {
		return this.getItems().reduce((total, item) => total + parseFloat(item.price, 10), 0);
	}

	getSubtotal(rabbit) {
		return this.getItems().reduce((total, item) => {
			const rabbitTagged = (item.rabbits.map(rabbitOnItem => rabbitOnItem.id).indexOf(rabbit.id) > -1);
			return rabbitTagged ? total + ((1.0 * parseFloat(item.price)) / item.rabbits.length) : total;
		}, 0);
	}

	getTotal(rabbit) {
		const { taxRate, tipRate } = this.state;

		return Math.round(100.0 * (1.0 + taxRate + tipRate) * this.getSubtotal(rabbit)) / 100;
	}

	bindEventHandlers() {
		this.onBeginEditTaxAndTipRate = this.onBeginEditTaxAndTipRate.bind(this);
		this.onTaxRateChange = this.onTaxRateChange.bind(this);
		this.onTipRateChange = this.onTipRateChange.bind(this);
		this.onSubmitTaxAndTipRate = this.onSubmitTaxAndTipRate.bind(this);
	}

	renderItems() {
		const items = this.getItems().map(this.renderItem, this);

		return (
			<div>
				<h3>Items:</h3>
				{items}
				<ItemCreator {...this.props} tabId={this.getTabId()} />
			</div>
		);
	}

	renderItem(item) {
		const onTagItem = this.onTagItem.bind(this, item);
		const rabbitIds = item.rabbits.map(rabbit => rabbit.id);
		const rabbitOwners = this.getRabbits().filter(rabbit => rabbitIds.indexOf(rabbit.id) > -1);

		return (
			<Item
				{...this.props}
				key={item.id}
				item={item}
				tabId={this.getTabId()}
				onClick={onTagItem}
				rabbitOwners={rabbitOwners}
			/>
		);
	}

	renderSubtotalTaxAndTip() {
		const rawSubtotal = this.getTabSubtotal();
		const { taxRate, tipRate } = this.state;

		if (rawSubtotal) {
			const subtotal = Math.round(100.0 * rawSubtotal) / 100;
			const tax = Math.round(100.0 * rawSubtotal * taxRate) / 100;
			const tip = Math.round(100.0 * rawSubtotal * tipRate) / 100;
			const total = Math.round(100 * (rawSubtotal + tax + tip)) / 100;

			const style = {
				width: '60px',
			};

			return (
				<div>
					<div>Subtotal: {formatDollar(subtotal)}</div>
					<div>
						Tax: {formatDollar(tax)}
						<button
							style={style}
							type="button"
							onClick={this.onBeginEditTaxAndTipRate}
						>
							{formatPercent(taxRate)}
						</button>
						{this.renderTaxEditor()}
					</div>
					<div>
						Tip: {formatDollar(tip)}
						<button
							style={style}
							type="button"
							onClick={this.onBeginEditTaxAndTipRate}
						>
							{formatPercent(tipRate)}
						</button>
						{this.renderTipEditor()}
					</div>
					<div>Total: {formatDollar(total)}</div>
				</div>
			);
		}

		return '';
	}

	renderTaxEditor() {
		const { editingTaxAndTipRate, taxRate } = this.state;

		if (editingTaxAndTipRate) {
			return (
				<input
					type="range"
					min="0"
					max="0.15"
					step=".0025"
					defaultValue={taxRate}
					onChange={this.onTaxRateChange}
				/>
			);
		}

		return '';
	}

	renderTipEditor() {
		const { editingTaxAndTipRate, tipRate } = this.state;

		if (editingTaxAndTipRate) {
			return (
				<span>
					<input
						type="range"
						min="0" max="0.30"
						step=".0025"
						defaultValue={tipRate}
						onChange={this.onTipRateChange}
					/>
					<button type="button" onClick={this.onSubmitTaxAndTipRate}>
						Save
					</button>
				</span>
			);
		}

		return '';
	}

	renderRabbits() {
		const allRabbits = this.props.rabbits;
		const rabbitsOnTab = this.getRabbits();
		const rabbits = rabbitsOnTab.map(this.renderRabbit, this);
		const idsOfrabbitsOnTab = rabbitsOnTab.map(rabbitOnTab => rabbitOnTab.id);
		const unusedRabbits = allRabbits.filter(unusedRabbit => idsOfrabbitsOnTab.indexOf(unusedRabbit.id) === -1);

		return (
			<div>
				<h3>Rabbits:</h3>
				{rabbits}
				<RabbitAdder {...this.props} tabId={this.getTabId()} unusedRabbits={unusedRabbits} />
			</div>
		);
	}

	renderRabbit(rabbit) {
		const active = this.state.activeRabbitId === rabbit.id;
		const onMakeRabbitActive = this.onMakeRabbitActive.bind(this, rabbit.id);
		const subtotal = this.getSubtotal(rabbit);
		const total = this.getTotal(rabbit);

		return (
			<Rabbit
				{...this.props}
				key={rabbit.id}
				rabbit={rabbit}
				tabId={this.getTabId()}
				tab={this.getTab()}
				active={active}
				subtotal={subtotal}
				total={total}
				onClick={onMakeRabbitActive}
			/>
		);
	}

	render() {
		const { name } = this.getTab();

		return (
			<div>
				<h2>{name}</h2>
				{this.renderSubtotalTaxAndTip()}
				{this.renderItems()}
				{this.renderRabbits()}
				<Link to="/tabs">All Tabs</Link>
			</div>
		);
	}
}

TabEditor.propTypes = {
	tabs: PropTypes.arrayOf(tabProps),
	rabbits: PropTypes.arrayOf(rabbitProps),
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	getRabbits: PropTypes.func.isRequired,
	getTab: PropTypes.func.isRequired,
	updateTab: PropTypes.func.isRequired,
	tagItem: PropTypes.func.isRequired,
	untagItem: PropTypes.func.isRequired,
};

TabEditor.defaultProps = {
	tabs: [],
	rabbits: [],
};

export default connect(TabEditor);
