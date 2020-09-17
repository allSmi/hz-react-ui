import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
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

var Overlay = /*#__PURE__*/function (_Component) {
  _inherits(Overlay, _Component);

  var _super = _createSuper(Overlay);

  function Overlay(props) {
    var _this;

    _classCallCheck(this, Overlay);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "overlayRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "touchMoveHandle", function (e) {
      e.stopPropagation();
      e.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_this), "scrollHandle", function (e) {
      e.stopPropagation();
      e.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_this), "clickHandle", function () {
      _this.props.click && _this.props.click();
    });

    _this.overlayRef = /*#__PURE__*/createRef();
    return _this;
  }

  _createClass(Overlay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var overlayEl = this.overlayRef.current;
      overlayEl === null || overlayEl === void 0 ? void 0 : overlayEl.addEventListener('touchmove', this.touchMoveHandle, true);
      overlayEl === null || overlayEl === void 0 ? void 0 : overlayEl.addEventListener('wheel', this.touchMoveHandle, true);
    }
  }, {
    key: "show",
    // new Overlay({click: ***}).show()
    value: function show() {
      var html = document.querySelector('html');
      var overlayHtml = document.createElement('div');
      overlayHtml.className = classPrefix('Overlay');
      overlayHtml.onclick = this.clickHandle;
      html.appendChild(overlayHtml);
    }
  }, {
    key: "hide",
    value: function hide() {
      var html = document.querySelector('html');
      var overlayHtml = document.querySelector('.' + classPrefix('Overlay'));
      html.removeChild(overlayHtml);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: classPrefix('Overlay'),
        ref: this.overlayRef,
        onClick: this.clickHandle
      });
    }
  }]);

  return Overlay;
}(Component);

export { Overlay as default };