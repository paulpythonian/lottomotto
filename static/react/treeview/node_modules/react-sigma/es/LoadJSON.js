import React from 'react';
import '../sigma/main.js';
import '../sigma/parsers.json.js';
import { embedProps } from './tools';

// TODO: make a superclass for loaders??

/**

LoadJSON component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins).
Child's componentWillMount should be used to enable plugins on loaded graph.

 @param {string} path   path to the JSON file
 @param {Function} onGraphLoaded        Optional callback for graph update

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)

**/

class LoadJSON extends React.PureComponent {

	constructor(props) {
		super(props);

		this.onLoad = () => {
			if (this.props.sigma) this.props.sigma.refresh();
			this.setState({ loaded: true });
			if (this.props.onGraphLoaded) return this.props.onGraphLoaded();
		};

		this.state = { loaded: false };
	}

	componentDidMount() {
		this._load(this.props.path);
	}

	componentWillReceiveProps(props) {
		// reload only if path changes
		if (this.props.path !== props.path) {
			this.setState({ loaded: false });
			this._load(props.path);
		}
	}

	render() {
		if (!this.state.loaded) return null;
		return React.createElement(
			'div',
			null,
			embedProps(this.props.children, { sigma: this.props.sigma })
		);
	}

	_load(url) {
		sigma.parsers.json(this.props.path, this.props.sigma, this.onLoad);
	}
}

LoadJSON.propTypes = {
	path: require('prop-types').string.isRequired,
	onGraphLoaded: require('prop-types').func,
	children: require('prop-types').any,
	sigma: typeof Sigma === 'function' ? require('prop-types').instanceOf(Sigma) : require('prop-types').any
};
export default LoadJSON;