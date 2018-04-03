'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../sigma/edges');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

EdgeShapes component, interface for customEdgeShapes sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

Note! this Component requires "canvas" renderer to work.

To assign a shape renderer to an edge, simply set edge.type='shape-name' e.g. edge.type='dotted'.
```
<Sigma renderer="canvas" graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
	<EdgeShapes default="dotted"/>
</Sigma>
```

Supported shapes
```
type Sigma$Edge$Shapes = "line" | "arrow" | "curve" | "curvedArrow" | "dashed" | "dotted" | "parallel" | "tapered";
```

See [plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customEdgeShapes)
for more datails on implementation.

@param {string} default  set default sigma edge to be applied to edges where type is not set

**/

var EdgeShapes = function (_React$Component) {
	_inherits(EdgeShapes, _React$Component);

	function EdgeShapes(props) {
		_classCallCheck(this, EdgeShapes);

		var _this = _possibleConstructorReturn(this, (EdgeShapes.__proto__ || Object.getPrototypeOf(EdgeShapes)).call(this, props));

		_this.render = function () {
			return null;
		};

		if (_this.props.sigma && _this.props.default) _this.props.sigma.settings({ defaultEdgeType: _this.props.default });
		return _this;
	}

	return EdgeShapes;
}(_react2.default.Component);

EdgeShapes.propTypes = {
	default: typeof Sigma$Edge$Shapes === 'function' ? require('prop-types').instanceOf(Sigma$Edge$Shapes) : require('prop-types').any,
	sigma: typeof Sigma === 'function' ? require('prop-types').instanceOf(Sigma) : require('prop-types').any
};
exports.default = EdgeShapes;