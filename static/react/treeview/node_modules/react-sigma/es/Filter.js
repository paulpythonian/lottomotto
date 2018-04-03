import React from 'react';
import '../sigma/plugins.filter';

/**

Filter component, interface for filter sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

Filter is hiding all nodes which do not apply to the provided nodesBy criteria.

@param {Nodes$Filter} nodesBy   will hide nodes where filter returns false

type Nodes$Filter = (node: Sigma$Node) => boolean;


**/

class Filter extends React.Component {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => null, _temp;
	}

	componentDidMount() {
		this.filter = new sigma.plugins.filter(this.props.sigma);
		this._apply(this.props);
	}

	// TODO: will it work in composition with ForceAtlas for instance?
	//It should hide nodes before rendering of subplugins, therefore used in componentWillUpdate.. is it right?
	componentWillUpdate(props) {
		if (props.nodesBy !== this.props.nodesBy || props.neighborsOf !== this.props.neighborsOf) this._apply(props);
	}

	// TODO: Composition is not working yet!!


	_apply(props) {
		this.filter.undo(["neighborsOf", "nodesBy"]);
		if (props.neighborsOf) {
			this.filter.neighborsOf(props.neighborsOf, "neighborsOf");
		}
		if (props.nodesBy) this.filter.nodesBy(props.nodesBy, "nodesBy");
		this.filter.apply();
		if (this.props.sigma) this.props.sigma.refresh();
	}
}

Filter.propTypes = {
	nodesBy: typeof Nodes$Filter === 'function' ? require('prop-types').instanceOf(Nodes$Filter) : require('prop-types').any,
	neighborsOf: require('prop-types').string,
	sigma: typeof Sigma === 'function' ? require('prop-types').instanceOf(Sigma) : require('prop-types').any
};
export default Filter;