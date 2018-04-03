'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../sigma/plugins.filter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

Filter component, interface for filter sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

Filter is hiding all nodes which do not apply to the provided nodesBy criteria.

@param {Nodes$Filter} nodesBy   will hide nodes where filter returns false

type Nodes$Filter = (node: Sigma$Node) => boolean;


**/

var Filter = function (_React$Component) {
	_inherits(Filter, _React$Component);

	function Filter() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Filter);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Filter.__proto__ || Object.getPrototypeOf(Filter)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
			return null;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Filter, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.filter = new sigma.plugins.filter(this.props.sigma);
			this._apply(this.props);
		}

		// TODO: will it work in composition with ForceAtlas for instance?
		//It should hide nodes before rendering of subplugins, therefore used in componentWillUpdate.. is it right?

	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(props) {
			if (props.nodesBy !== this.props.nodesBy || props.neighborsOf !== this.props.neighborsOf) this._apply(props);
		}

		// TODO: Composition is not working yet!!

	}, {
		key: '_apply',
		value: function _apply(props) {
			this.filter.undo(["neighborsOf", "nodesBy"]);
			if (props.neighborsOf) {
				this.filter.neighborsOf(props.neighborsOf, "neighborsOf");
			}
			if (props.nodesBy) this.filter.nodesBy(props.nodesBy, "nodesBy");
			this.filter.apply();
			if (this.props.sigma) this.props.sigma.refresh();
		}
	}]);

	return Filter;
}(_react2.default.Component);

Filter.propTypes = {
	nodesBy: typeof Nodes$Filter === 'function' ? require('prop-types').instanceOf(Nodes$Filter) : require('prop-types').any,
	neighborsOf: require('prop-types').string,
	sigma: typeof Sigma === 'function' ? require('prop-types').instanceOf(Sigma) : require('prop-types').any
};
exports.default = Filter;