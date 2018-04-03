'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../sigma/nodes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

NodeShapes component, interface for customShapes sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

Note! this Component requires "canvas" renderer to work.

Extra node properties:
 - node.type='shape-name' - node shape renderer e.g. node.type='cross'.
 - node.borderColor - e.g. node.borderColor='#FF3333'
Details on shapes configuration and possibility to apply images to nodes, please refer to
[plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customShapes#images).

See [plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customEdgeShapes)
for more datails on implementation.

@param {string} default  set default sigma node renderer to be applied to nodes where type is not set


@example
```
<Sigma renderer="canvas" graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
	<NodeShapes default="star"/>
</Sigma>
```

@example
Supported shapes
```
type Sigma$Node$Shapes = "def" | "pacman" | "star" | "equilateral" | "cross" | "diamond" | "circle" | "square";
```

**/

var NodeShapes = function (_React$Component) {
	_inherits(NodeShapes, _React$Component);

	function NodeShapes(props) {
		_classCallCheck(this, NodeShapes);

		var _this = _possibleConstructorReturn(this, (NodeShapes.__proto__ || Object.getPrototypeOf(NodeShapes)).call(this, props));

		_this.render = function () {
			return null;
		};

		if (_this.props.sigma && _this.props.default) _this.props.sigma.settings({ defaultNodeType: _this.props.default });
		return _this;
	}

	return NodeShapes;
}(_react2.default.Component);

NodeShapes.propTypes = {
	default: typeof Sigma$Node$Shapes === 'function' ? require('prop-types').instanceOf(Sigma$Node$Shapes) : require('prop-types').any,
	sigma: typeof sigma === 'function' ? require('prop-types').instanceOf(sigma) : require('prop-types').any
};
exports.default = NodeShapes;