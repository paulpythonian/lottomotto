'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../sigma/layout.forceLink');

var _tools = require('./tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

ForceLink component, starts Force Atlas2 algorythm once component is mounted,
it is advanced version of ForceAtlas2 plugin, but it is not included in the main
distribution script react-sigma.min.js , rather should be imported explicitly:

```
import ForceLink from 'react-sigma/lib/ForceLink'
```

It accepts all the parameters of ForceLink described on its github page:
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
@param {boolean} alignNodeSiblings
@param {number} nodeSiblingsScale
@param {number} nodeSiblingsAngleMin
@param {boolean} [worker=true]  Use a web worker to run calculations in separate thread
@param {boolean} background
@param {Sigma$Easing} easing  Easing mode
@param {"globally"|"locally"} randomize  Randomize node positions before start
@param {number} slowDown
@param {number} timeout   how long algorythm should run. default=graph.nodes().length * 10

[see sigma plugin page for more details](https://github.com/Linkurious/linkurious.js/tree/develop/plugins/sigma.layouts.forceLink)

@example
import ForceLink from 'react-sigma/lib/ForceLink'
...
<Sigma>
  <LoadJSON path="/public/graph.json">
    <RelativeSize initialSize={8}/>
    <ForceLink background easing="cubicInOut"/>
  </LoadJSON>
</Sigma>

**/

var ForceLink = function (_React$Component) {
  _inherits(ForceLink, _React$Component);

  function ForceLink() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ForceLink);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ForceLink.__proto__ || Object.getPrototypeOf(ForceLink)).call.apply(_ref, [this].concat(args))), _this), _this.state = { running: true }, _this.render = function () {
      if (_this.state.running) return null;
      return _react2.default.createElement(
        'div',
        null,
        (0, _tools.embedProps)(_this.props.children, { sigma: _this.props.sigma })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ForceLink, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._refreshGraph();
    }

    // Change sigma status only after react rendering complete

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var s = this.props.sigma;
      if (prevState.running && !this.state.running && s) {
        this._stopForceLink();
        s.refresh();
      } else if (ForceLink._propsChanged(prevProps, this.props)) {
        this._stopForceLink();
        this._refreshGraph();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._stopForceLink();
    }
  }, {
    key: '_stopForceLink',
    value: function _stopForceLink() {
      sigma.layouts.stopForceLink();
      if (this.state.timer) clearTimeout(this.state.timer);
      if (this.props.sigma && this.props.sigma.settings) this.props.sigma.settings({ drawEdges: this.state.drawEdges });
    }
  }, {
    key: '_refreshGraph',
    value: function _refreshGraph() {
      var _this2 = this;

      var s = this.props.sigma;
      if (!sigma || !s) return;

      var drawEdges = s.settings("drawEdges");
      if (s.graph.edges().length > 1000) s.settings({ drawEdges: false });

      sigma.layouts.configForceLink(s, ForceLink._stripOptions(this.props));
      sigma.layouts.startForceLink(s);
      // TODO: convert running status to state
      var timer = setTimeout(function () {
        _this2.setState({ running: false, timer: undefined });
      }, this.props.timeout || s.graph.nodes().length * 8);
      this.setState({ running: true, timer: timer, drawEdges: drawEdges });
    }

    //strip force atlas options from component props

  }], [{
    key: '_stripOptions',
    value: function _stripOptions(props) {
      return Object.assign({}, props, { children: undefined, sigma: undefined });
    }
  }, {
    key: '_propsChanged',
    value: function _propsChanged(prev, next) {
      for (var key in prev) {
        if (prev[key] !== next[key]) return true;
      }return false;
    }
  }]);

  return ForceLink;
}(_react2.default.Component);

ForceLink.defaultProps = {
  worker: true,
  linLogMode: true
};
ForceLink.propTypes = {
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
  alignNodeSiblings: require('prop-types').bool,
  nodeSiblingsScale: require('prop-types').number,
  nodeSiblingsAngleMin: require('prop-types').number,
  worker: require('prop-types').bool.isRequired,
  background: require('prop-types').bool,
  easing: typeof Sigma$Easing === 'function' ? require('prop-types').instanceOf(Sigma$Easing) : require('prop-types').any,
  randomize: require('prop-types').oneOf(['globally', 'locally', 'no']),
  timeout: require('prop-types').number,
  children: require('prop-types').any,
  sigma: typeof Sigma === 'function' ? require('prop-types').instanceOf(Sigma) : require('prop-types').any
};
exports.default = ForceLink;