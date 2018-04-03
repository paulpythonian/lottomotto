import React from 'react';
import * as Utils from './Utils';

/**

ReactSigmaLayoutPlugin is a base class for sigma plugins.

Usage
```
const NOverlap = (props: Props) => {
				const s = props.sigma
				if(s)
          return <ReactSigmaLayoutPlugin
              start={()=>s.startNoverlap()}
              config={options=>s.configNoverlap(options)}
              stop={s.stopNoverlap()} {...props} />
				return null
			}
...
<NOverlap easing="cubicInOut"/>
```
**/

class ReactSigmaLayoutPlugin extends React.Component {

	constructor(props) {
		super(props);
		this._mounted = false;

		this.render = () => null;

		this.state = { running: false };
	}

	componentDidMount() {
		this._start();
		this._mounted = true;
	}

	// Change sigma status only after react rendering complete
	componentDidUpdate(prevProps, prevState) {
		if (prevState.running && !this.state.running && this._mounted) {
			if (this.props.sigma) this.props.sigma.refresh();
		} else if (Utils.propsChanged(prevProps, this.props)) {
			this.props.stop();
			this._start();
		}
	}

	componentWillUnmount() {
		this._mounted = false;
		this.props.stop();
	}

	//TODO: Render composition of child components after animation


	_start() {
		this.props.config(ReactSigmaLayoutPlugin._stripOptions(this.props));
		let listener = this.props.start();

		listener.bind('stop', () => {
			this._mounted && this.setState({ running: false });
		});

		this.setState({ running: true });
	}

	static _stripOptions(props) {
		let config = {};
		for (let key in props) if (key !== "start" && key !== "stop" && key !== "config" && key !== "sigma" && key !== "children") config[key] = props[key];
		return config;
	}
}

ReactSigmaLayoutPlugin.propTypes = {
	config: require('prop-types').func.isRequired,
	start: require('prop-types').func.isRequired,
	stop: require('prop-types').func.isRequired,
	sigma: typeof sigma === 'function' ? require('prop-types').instanceOf(sigma) : require('prop-types').any
};
export default ReactSigmaLayoutPlugin;