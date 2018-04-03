'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../sigma/parsers.json.js');

require('../sigma/neo4j.cypher');

var _NeoGraphItemsProducers = require('./NeoGraphItemsProducers');

var _NeoGraphItemsProducers2 = _interopRequireDefault(_NeoGraphItemsProducers);

var _tools = require('./tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

;

/**

NeoCypher component, interface for neo4j.cypher sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins).
Child's componentWillMount should be used to enable plugins on loaded graph.

 @param {string} url    Neo4j instance REST API URL
 @param {string} user    Neo4j instance REST API user
 @param {string} password    Neo4j instance REST API password
 @param {string} query    Neo4j cypher query
 @param {NeoGraphItemsProducers} producers   Optional transformer for creating Sigma nodes and edges,
                                    instance compatible with NeoGraphItemsProducers
 @param {Function} onGraphLoaded        Optional callback for graph update

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)

**/

var NeoCypher = function (_React$PureComponent) {
    _inherits(NeoCypher, _React$PureComponent);

    function NeoCypher(props) {
        _classCallCheck(this, NeoCypher);

        var _this = _possibleConstructorReturn(this, (NeoCypher.__proto__ || Object.getPrototypeOf(NeoCypher)).call(this, props));

        _this.onLoad = function () {
            _this.setState({ loaded: true });
            if (_this.props.sigma) _this.props.sigma.refresh();
            if (_this.props.onGraphLoaded) return _this.props.onGraphLoaded();
        };

        _this.state = { loaded: false };
        return _this;
    }

    _createClass(NeoCypher, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._runQuery(this.props.query);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(props) {
            // suppose url, user or password won't change for sigma instance, as well as sigma instance itself
            if (this.props.query !== props.query) {
                this.setState({ loaded: false });
                this._runQuery(props.query);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.state.loaded) return null;
            return _react2.default.createElement(
                'div',
                null,
                (0, _tools.embedProps)(this.props.children, { sigma: this.props.sigma })
            );
        }
    }, {
        key: '_runQuery',
        value: function _runQuery(query) {
            // TODO: add exception handling capability to Sigma Neo4j plugin
            sigma.neo4j.cypher({ url: this.props.url, user: this.props.user, password: this.props.password }, query, this.props.sigma, this.onLoad, this.props.producers);
        }
    }]);

    return NeoCypher;
}(_react2.default.PureComponent);

NeoCypher.defaultProps = {
    producers: new _NeoGraphItemsProducers2.default()
};
NeoCypher.propTypes = {
    url: require('prop-types').string.isRequired,
    user: require('prop-types').string.isRequired,
    password: require('prop-types').string.isRequired,
    query: require('prop-types').string.isRequired,
    producers: typeof ProducersInterface === 'function' ? require('prop-types').instanceOf(ProducersInterface).isRequired : require('prop-types').any.isRequired,
    onGraphLoaded: require('prop-types').func,
    children: require('prop-types').any,
    sigma: typeof sigma === 'function' ? require('prop-types').instanceOf(sigma) : require('prop-types').any
};
exports.default = NeoCypher;