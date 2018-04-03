'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Utils = require('./Utils');

var Utils = _interopRequireWildcard(_Utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var ReactSigmaLayoutPlugin = function (_React$Component) {
	_inherits(ReactSigmaLayoutPlugin, _React$Component);

	function ReactSigmaLayoutPlugin(props) {
		_classCallCheck(this, ReactSigmaLayoutPlugin);

		var _this = _possibleConstructorReturn(this, (ReactSigmaLayoutPlugin.__proto__ || Object.getPrototypeOf(ReactSigmaLayoutPlugin)).call(this, props));

		_this._mounted = false;

		_this.render = function () {
			return null;
		};

		_this.state = { running: false };
		return _this;
	}

	_createClass(ReactSigmaLayoutPlugin, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._start();
			this._mounted = true;
		}

		// Change sigma status only after react rendering complete

	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.running && !this.state.running && this._mounted) {
				if (this.props.sigma) this.props.sigma.refresh();
			} else if (Utils.propsChanged(prevProps, this.props)) {
				this.props.stop();
				this._start();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._mounted = false;
			this.props.stop();
		}

		//TODO: Render composition of child components after animation

	}, {
		key: '_start',
		value: function _start() {
			var _this2 = this;

			this.props.config(ReactSigmaLayoutPlugin._stripOptions(this.props));
			var listener = this.props.start();

			listener.bind('stop', function () {
				_this2._mounted && _this2.setState({ running: false });
			});

			this.setState({ running: true });
		}
	}], [{
		key: '_stripOptions',
		value: function _stripOptions(props) {
			var config = {};
			for (var key in props) {
				if (key !== "start" && key !== "stop" && key !== "config" && key !== "sigma" && key !== "children") config[key] = props[key];
			}return config;
		}
	}]);

	return ReactSigmaLayoutPlugin;
}(_react2.default.Component);

ReactSigmaLayoutPlugin.propTypes = {
	config: require('prop-types').func.isRequired,
	start: require('prop-types').func.isRequired,
	stop: require('prop-types').func.isRequired,
	sigma: typeof sigma === 'function' ? require('prop-types').instanceOf(sigma) : require('prop-types').any
};
exports.default = ReactSigmaLayoutPlugin;