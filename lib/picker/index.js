import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
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
import Overlay from '../overlay';

var Picker = /*#__PURE__*/function (_Component) {
  _inherits(Picker, _Component);

  var _super = _createSuper(Picker);

  function Picker(props) {
    var _this;

    _classCallCheck(this, Picker);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", {
      itemHeight: 0,
      translate: 0,
      animate: false
    });

    _defineProperty(_assertThisInitialized(_this), "pickerRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "initClientY", 0);

    _defineProperty(_assertThisInitialized(_this), "initTanslateY", 0);

    _defineProperty(_assertThisInitialized(_this), "overlayClick", function () {
      _this.props.onCancle && _this.props.onCancle();
    });

    _defineProperty(_assertThisInitialized(_this), "cancleHandle", function () {
      _this.props.onCancle && _this.props.onCancle();
    });

    _defineProperty(_assertThisInitialized(_this), "confirmHandle", function () {
      var _this$state = _this.state,
          translate = _this$state.translate,
          itemHeight = _this$state.itemHeight;
      var columns = _this.props.columns;
      var select = columns[(itemHeight * 2 - translate) / itemHeight];
      _this.props.onOk && _this.props.onOk({
        data: select
      });
    });

    _defineProperty(_assertThisInitialized(_this), "touchMoveHandle", function (e) {
      e.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_this), "pickerTouchstartHandle", function (e) {
      _this.initClientY = e.touches[0].clientY;

      _this.setState({
        animate: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "pickerTouchmoveHandle", function (e) {
      var diffY = _this.initClientY - e.touches[0].clientY;
      var move = _this.initTanslateY - diffY;

      if (move <= _this.state.itemHeight * 2 && move >= -(_this.state.itemHeight * _this.props.columns.length - _this.state.itemHeight * 2 - _this.state.itemHeight)) {
        _this.setState({
          translate: _this.initTanslateY - diffY
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "pickerTouchendHandle", function (e) {
      var _this$state2 = _this.state,
          translate = _this$state2.translate,
          itemHeight = _this$state2.itemHeight;
      var index = Math.round((_this.state.itemHeight * 2 - translate) / itemHeight);

      _this.setState({
        translate: itemHeight * 2 - index * itemHeight,
        animate: true
      }, function () {
        _this.initTanslateY = _this.state.translate;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "scrollHandle", function (e) {
      e.stopPropagation();
      e.preventDefault();
    });

    _this.pickerRef = /*#__PURE__*/createRef();
    return _this;
  }

  _createClass(Picker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var pickerEl = this.pickerRef.current;
      pickerEl === null || pickerEl === void 0 ? void 0 : pickerEl.addEventListener('touchmove', this.touchMoveHandle, true);
      pickerEl === null || pickerEl === void 0 ? void 0 : pickerEl.addEventListener('wheel', this.touchMoveHandle, true);
      this.init();
    }
  }, {
    key: "init",
    value: function init() {
      var toolbarEl = document.querySelector(".".concat(classPrefix('Picker-toolbar')));
      var itemHeight = toolbarEl.offsetHeight;
      this.initTanslateY = itemHeight * 2;
      this.setState({
        translate: itemHeight * 2,
        itemHeight: itemHeight
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // 比较两次数据，如果不同执行init
      if (prevProps.columns.length !== this.props.columns.length) {
        this.init();
      } else if (JSON.stringify(prevProps.columns) !== JSON.stringify(this.props.columns)) {
        this.init();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          show = _this$props.show,
          columns = _this$props.columns;
      var _this$state3 = this.state,
          translate = _this$state3.translate,
          itemHeight = _this$state3.itemHeight,
          animate = _this$state3.animate;
      return /*#__PURE__*/React.createElement(React.Fragment, null, show ? /*#__PURE__*/React.createElement(Overlay, {
        click: this.overlayClick
      }) : null, /*#__PURE__*/React.createElement("div", {
        ref: this.pickerRef,
        className: classPrefix('Picker ') + (show ? classPrefix('Picker-show') : classPrefix('Picker-hide'))
      }, /*#__PURE__*/React.createElement("div", {
        className: classPrefix('Picker-toolbar')
      }, /*#__PURE__*/React.createElement("div", {
        className: classPrefix('Picker-toolbar-item'),
        onClick: this.cancleHandle
      }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement("div", {
        className: classPrefix('Picker-toolbar-item'),
        onClick: this.confirmHandle
      }, "\u786E\u8BA4")), /*#__PURE__*/React.createElement("div", {
        className: classPrefix('Picker-columns'),
        style: {
          height: itemHeight * 5 + 'px'
        },
        onTouchStart: this.pickerTouchstartHandle,
        onTouchEnd: this.pickerTouchendHandle,
        onTouchMove: this.pickerTouchmoveHandle
      }, /*#__PURE__*/React.createElement("ul", {
        style: {
          transform: 'translate3d(0,' + translate + 'px,0)',
          height: itemHeight * columns.length + 'px'
        },
        className: classPrefix('Picker-column') + (animate ? ' ' + classPrefix('Picker-animate') : '')
      }, columns.map(function (item) {
        return /*#__PURE__*/React.createElement("li", {
          className: classPrefix('Picker-column-item'),
          key: item
        }, item);
      })), /*#__PURE__*/React.createElement("div", {
        className: classPrefix('Picker-mask')
      }), /*#__PURE__*/React.createElement("div", {
        className: 'hz__hairline-top-bottom ' + classPrefix('Picker-select')
      }))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return null;
    }
  }]);

  return Picker;
}(Component);

_defineProperty(Picker, "defaultProps", {
  columns: []
});

export { Picker as default };