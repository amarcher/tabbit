import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { tab as tabProps, rabbit as rabbitProps } from '../propTypes';
import Item from './Item';
import Rabbit from './Rabbit';
import RabbitAdder from './RabbitAdder';
import ItemCreator from './ItemCreator';
import connect from '../connect';

const DEFAULT_TAX = 0.0875;
const DEFAULT_TIP = 0.18;

class TabEditor extends Component { // eslint-disable-line react/prefer-stateless-function]
	componentWillMount() {
		this.props.getRabbits();

		this.state = {
			activeRabbitId: undefined,
			tax: DEFAULT_TAX,
			tip: DEFAULT_TIP,
		};

		if (!this.getItems().length) {
			this.props.getTab(this.getTabId());
		}
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
		return this.getItems().reduce((total, item) => total + item.price, 0);
	}

	getSubtotal(rabbit) {
		const { tax, tip } = this.state;

		const rawSubtotal = this.getItems().reduce((total, item) => {
			const rabbitTagged = (item.rabbits.map(rabbitOnItem => rabbitOnItem.id).indexOf(rabbit.id) > -1);
			return rabbitTagged ? total + ((1.0 * item.price) / item.rabbits.length) : total;
		}, 0);

		return Math.round(100.0 * (1.0 + tax + tip) * rawSubtotal) / 100;
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

		if (rawSubtotal) {
			const subtotal = Math.round(100.0 * rawSubtotal) / 100;
			const tax = Math.round(100.0 * rawSubtotal * this.state.tax) / 100;
			const tip = Math.round(100.0 * rawSubtotal * this.state.tip) / 100;
			const total = rawSubtotal + tax + tip;

			return (
				<div>
					<div>Subtotal: {subtotal}</div>
					<div>Tax: {tax}</div>
					<div>Tip: {tip}</div>
					<div>Total: {total}</div>
				</div>
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

		return (
			<Rabbit
				{...this.props}
				key={rabbit.id}
				rabbit={rabbit}
				tabId={this.getTabId()}
				tab={this.getTab()}
				active={active}
				subtotal={subtotal}
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
	tagItem: PropTypes.func.isRequired,
	untagItem: PropTypes.func.isRequired,
};

TabEditor.defaultProps = {
	tabs: [],
	rabbits: [],
};

export default connect(TabEditor);
