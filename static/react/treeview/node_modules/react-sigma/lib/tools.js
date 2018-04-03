'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.embedProps = embedProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function embedProps(elements, extraProps) {
  return _react2.default.Children.map(elements, function (element) {
    return _react2.default.cloneElement(element, extraProps);
  });
}