'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../sigma/plugins.relativeSize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

RelativeSize component, interface for RelativeSize sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

Sets nodes sizes corresponding its degree.

 @param {number} initialSize  start size for every node, will be multiplied by Math.sqrt(node.degree)

**/

var RelativeSize = function (_React$Component) {
	_inherits(RelativeSize, _React$Component);

	function RelativeSize(props) {
		_classCallCheck(this, RelativeSize);

		var _this = _possibleConstructorReturn(this, (RelativeSize.__proto__ || Object.getPrototypeOf(RelativeSize)).call(this, props));

		_this.render = function () {
			return null;
		};

		sigma.plugins.relativeSize(_this.props.sigma, _this.props.initialSize);
		return _this;
	}

	return RelativeSize;
}(_react2.default.Component);

RelativeSize.propTypes = {
	initialSize: require('prop-types').number.isRequired,
	sigma: typeof sigma === 'function' ? require('prop-types').instanceOf(sigma) : require('prop-types').any
};
exports.default = RelativeSize;