'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tools = require('./tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

RandomizeNodePositions component, sets random positions to all nodes.
Can be used within Sigma component with predefined graph or within graph loader component.

**/

var RandomizeNodePositions = function (_React$PureComponent) {
  _inherits(RandomizeNodePositions, _React$PureComponent);

  function RandomizeNodePositions(props) {
    _classCallCheck(this, RandomizeNodePositions);

    var _this = _possibleConstructorReturn(this, (RandomizeNodePositions.__proto__ || Object.getPrototypeOf(RandomizeNodePositions)).call(this, props));

    if (_this.props.sigma) {
      _this.props.sigma.graph.nodes().forEach(function (n) {
        n.x = Math.random();
        n.y = Math.random();
      });
    }
    if (_this.props.sigma) _this.props.sigma.refresh();
    return _this;
  }

  _createClass(RandomizeNodePositions, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.sigma) this.props.sigma.refresh();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        (0, _tools.embedProps)(this.props.children, { sigma: this.props.sigma })
      );
    }
  }]);

  return RandomizeNodePositions;
}(_react2.default.PureComponent);

RandomizeNodePositions.propTypes = {
  children: require('prop-types').any,
  sigma: typeof sigma === 'function' ? require('prop-types').instanceOf(sigma) : require('prop-types').any
};
exports.default = RandomizeNodePositions;