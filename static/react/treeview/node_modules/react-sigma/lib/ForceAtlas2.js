'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../sigma/layout.forceAtlas2');

var _tools = require('./tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

ForceAtlas2 component, starts ForceAtlas2 sigma plugin once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

It accepts all the parameters of ForceAtlas2 described on its github page:
@param {boolean} [worker=true]           Use a web worker to run calculations in separate thread
@param {boolean} barnesHutOptimize  Use the algorithm's Barnes-Hut to improve repulsion's scalability
									This is useful for large graph but harmful to small ones.
@param {number} barnesHutTheta
@param {boolean} adjustSizes
@param {number} iterationsPerRender
@param {boolean} [linLogMode=true]
@param {boolean} outboundAttractionDistribution
@param {number} edgeWeightInfluence
@param {number} scalingRatio
@param {boolean} strongGravityMode
@param {number} gravity
@param {number} slowDown
@param {number} timeout   how long algorythm should run. default=graph.nodes().length * 10

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.forceAtlas2)

**/

var ForceAtlas2 = function (_React$Component) {
	_inherits(ForceAtlas2, _React$Component);

	function ForceAtlas2(props) {
		_classCallCheck(this, ForceAtlas2);

		var _this = _possibleConstructorReturn(this, (ForceAtlas2.__proto__ || Object.getPrototypeOf(ForceAtlas2)).call(this, props));

		_this.state = { running: false };
		return _this;
	}

	_createClass(ForceAtlas2, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._refreshGraph();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			var s = this.props.sigma;
			if (prevState.running && !this.state.running && s) {
				s.stopForceAtlas2();
				s.settings({ drawEdges: prevState.drawEdges === false ? false : true });
				s.refresh();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.props.sigma) this.props.sigma.killForceAtlas2();
			if (this.state.timer) clearTimeout(this.state.timer);
		}
	}, {
		key: 'render',
		value: function render() {
			if (!this.state.running) {
				return _react2.default.createElement(
					'div',
					null,
					(0, _tools.embedProps)(this.props.children, { sigma: this.props.sigma })
				);
			}
			return null;
		}
	}, {
		key: '_refreshGraph',
		value: function _refreshGraph() {
			var _this2 = this;

			var s = this.props.sigma;
			if (!sigma || !s) return;

			var drawEdges = s.settings("drawEdges");
			if (s.graph.edges().length > 1000) s.settings({ drawEdges: false });

			s.startForceAtlas2(this._stripOptions(this.props));
			// TODO: convert running status to state
			var timer = setTimeout(function () {
				_this2.setState({ running: false, timer: undefined });
			}, this.props.timeout || s.graph.nodes().length * 8);
			this.setState({ running: true, timer: timer, drawEdges: drawEdges });
		}

		//strip force atlas options from component props

	}, {
		key: '_stripOptions',
		value: function _stripOptions(props) {
			return Object.assign({}, props, {
				sigma: undefined,
				children: undefined
			});
		}
	}]);

	return ForceAtlas2;
}(_react2.default.Component);

ForceAtlas2.defaultProps = {
	worker: true,
	linLogMode: true
};
ForceAtlas2.propTypes = {
	worker: require('prop-types').bool.isRequired,
	barnesHutOptimize: require('prop-types').bool,
	barnesHutTheta: require('prop-types').number,
	adjustSizes: require('prop-types').bool,
	iterationsPerRender: require('prop-types').number,
	linLogMode: require('prop-types').bool.isRequired,
	outboundAttractionDistribution: require('prop-types').bool,
	edgeWeightInfluence: require('prop-types').number,
	scalingRatio: require('prop-types').number,
	strongGravityMode: require('prop-types').bool,
	slowDown: require('prop-types').number,
	gravity: require('prop-types').number,
	timeout: require('prop-types').number,
	sigma: typeof sigma === 'function' ? require('prop-types').instanceOf(sigma) : require('prop-types').any,
	children: require('prop-types').any
};
exports.default = ForceAtlas2;