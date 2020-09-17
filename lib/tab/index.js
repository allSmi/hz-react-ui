import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.for-each";
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

var componentName = /*#__PURE__*/function (_Component) {
  _inherits(componentName, _Component);

  var _super = _createSuper(componentName);

  function componentName(props) {
    var _this;

    _classCallCheck(this, componentName);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "tabEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      index: 0,
      prevIndex: 0,
      style: {
        translateX: 0,
        width: 0
      }
    });

    _defineProperty(_assertThisInitialized(_this), "calcActiveStyle", function () {
      var tabEl = _this.tabEl.current;
      var index = _this.state.index; // let prevIndex = this.state.prevIndex

      var tabItem = tabEl.querySelector('.' + classPrefix('TabItem'));
      var tabItemWidth = tabItem.offsetWidth;
      var tabItems = tabEl.querySelectorAll('.' + classPrefix('TabItem-item'));

      if (tabItems.length) {
        var activeItem = tabItems[index];
        var activeItemWidth = activeItem.offsetWidth;
        var sum = 0;

        for (var i = 0; i < index; i++) {
          sum += tabItems[i].offsetWidth;
        }

        var translateX = sum + activeItemWidth * 0.5 - activeItemWidth * 0.6 * 0.5;

        if (tabItem.scrollTo) {
          tabItem.scrollTo({
            left: translateX - tabItemWidth / 2,
            behavior: 'smooth'
          });
        } else {
          // 兼容ie浏览器，华为浏览器
          tabItem.scrollLeft = translateX - tabItemWidth / 2;
        }

        _this.setState({
          style: {
            width: activeItemWidth * 0.6,
            translateX: translateX
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changeItem", function (index) {
      _this.setState({
        index: index,
        prevIndex: _this.state.index
      }, function () {
        _this.calcActiveStyle();

        _this.props.onChange && _this.props.onChange(index);
      });
    });

    _this.tabEl = /*#__PURE__*/createRef();
    return _this;
  }

  _createClass(componentName, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var index = this.props.index;
      this.setState({
        index: index
      }, function () {
        setTimeout(function () {
          _this2.calcActiveStyle();
        }, 200);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className;
      var _this$state = this.state,
          index = _this$state.index,
          style = _this$state.style;
      var titles = [];
      var contents = [];

      if (children) {
        if (Array.isArray(children)) {
          var tabItems = children;
          tabItems.forEach(function (item) {
            var props = item.props;
            titles.push(props.title);
            contents.push(props.children);
          });
        } else {
          var props = children.props;
          titles.push(props.title);
          contents.push(props.children);
        }
      }

      return /*#__PURE__*/React.createElement("div", {
        ref: this.tabEl,
        className: classPrefix('Tab') + (className ? ' ' + className : '')
      }, /*#__PURE__*/React.createElement("div", {
        className: classPrefix('TabItem')
      }, titles.map(function (item, i) {
        return /*#__PURE__*/React.createElement("div", {
          onClick: function onClick() {
            _this3.changeItem(i);
          },
          className: classPrefix('TabItem-item') + (i === index ? ' ' + classPrefix('TabItem-active') : ''),
          key: i
        }, item);
      }), /*#__PURE__*/React.createElement("div", {
        className: classPrefix('TabItem-active-indicator'),
        style: {
          width: style.width + 'px',
          transform: "translateX(".concat(style.translateX + 'px', ")")
        }
      })), /*#__PURE__*/React.createElement("div", {
        className: classPrefix('Tab-content')
      }, contents[index]));
    }
  }]);

  return componentName;
}(Component);

_defineProperty(componentName, "defaultProps", {
  index: 0
});

export { componentName as default };