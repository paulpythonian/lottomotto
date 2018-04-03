'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../sigma/layout.dagre');

var _ReactSigmaLayoutPlugin = require('./ReactSigmaLayoutPlugin');

var _ReactSigmaLayoutPlugin2 = _interopRequireDefault(_ReactSigmaLayoutPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**

Dagre layout algorythm.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

It accepts all the parameters of Dagre described on its github page:
@param {boolean}	directed?
@param {boolean}	multigraph?
@param {boolean}	compound?
@param {"TB"|"BT"|"RL"|"LR"}	rankDir?
@param {Sigma$Easing} easing  Easing mode

[see sigma plugin page for more details](https://github.com/Linkurious/linkurious.js/tree/develop/plugins/sigma.layouts.dagre)

**/

var Dagre = function Dagre(props) {
	return !!props.sigma ? _react2.default.createElement(_ReactSigmaLayoutPlugin2.default, _extends({
		start: function start() {
			return sigma.layouts.dagre.start(props.sigma);
		},
		config: function config(options) {
			return sigma.layouts.dagre.configure(props.sigma, options);
		},
		stop: function stop() {
			return console.warn("dagre stop not implemented");
		} }, props)) : null;
};

Dagre.propTypes = {
	directed: require('prop-types').bool,
	multigraph: require('prop-types').bool,
	compound: require('prop-types').bool,
	rankDir: require('prop-types').oneOf(['TB', 'BT', 'RL', 'LR']),
	easing: typeof Sigma$Easing === 'function' ? require('prop-types').instanceOf(Sigma$Easing) : require('prop-types').any,
	sigma: typeof Sigma === 'function' ? require('prop-types').instanceOf(Sigma) : require('prop-types').any
};
exports.default = Dagre;