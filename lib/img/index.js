import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.replace";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, createRef } from 'react';
import './index.scss';
import classPrefix from '../class-prefix';

var Img = /*#__PURE__*/function (_Component) {
  _inherits(Img, _Component);

  var _super = _createSuper(Img);

  function Img(props) {
    var _this;

    _classCallCheck(this, Img);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "imgPlaceholder", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoad: false
    });

    _defineProperty(_assertThisInitialized(_this), "loadImg", function () {
      var src = _this.props.src;

      if (src) {
        _this.setState({
          isLoad: false
        });

        var img = new Image();
        img.src = src;

        img.onload = function () {
          var parentElement = _this.imgPlaceholder.current;
          var ancestorsElement = parentElement.parentElement;
          var reg = new RegExp('\\s?' + classPrefix('Img') + '-.*', 'g');
          ancestorsElement.className = ancestorsElement.className.replace(reg, '');

          if (_this.props.mode === 'cover') {
            var imgRatio = img.naturalWidth / img.naturalHeight;
            var parentStyle = parentElement.getBoundingClientRect();
            var containerRatio = parentStyle.width / parentStyle.height;

            if (imgRatio > containerRatio) {
              ancestorsElement.className += ' ' + classPrefix('Img-height');
            } else if (imgRatio < containerRatio) {
              ancestorsElement.className += ' ' + classPrefix('Img-width');
            } else {
              ancestorsElement.className += ' ' + classPrefix('Img-center');
            }
          } else if (_this.props.mode === 'center') {
            ancestorsElement.className += ' ' + classPrefix('Img-center');
          }

          _this.setState({
            isLoad: true
          });
        };
      }
    });

    _this.imgPlaceholder = /*#__PURE__*/createRef();
    return _this;
  }

  _createClass(Img, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadImg();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var src = this.props.src;

      if (src !== prevProps.src) {
        this.loadImg();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          src = _this$props.src,
          className = _this$props.className,
          width = _this$props.width,
          height = _this$props.height;
      var isLoad = this.state.isLoad;
      return /*#__PURE__*/React.createElement(React.Fragment, null, isLoad ? /*#__PURE__*/React.createElement("img", {
        "data-load": isLoad,
        src: src,
        className: classPrefix('Img') + (className ? ' ' + className : ''),
        alt: ""
      }) : /*#__PURE__*/React.createElement("div", {
        ref: this.imgPlaceholder,
        className: classPrefix('Img') + (className ? ' ' + className : ''),
        style: {
          width: width,
          height: height
        }
      }));
    }
  }]);

  return Img;
}(Component);

_defineProperty(Img, "defaultProps", {
  width: '100%',
  height: '100%'
});

export { Img as default };