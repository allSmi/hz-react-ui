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

import React, { Children, Component } from 'react';
import { createRef } from 'react';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { add, remove } from './utils/eventlistener';
import parentScroll from './utils/parentScroll';
import inViewport from './utils/inViewport';
import classPrefix from '../class-prefix';
import "./index.scss";

var LazyLoad = /*#__PURE__*/function (_Component) {
  _inherits(LazyLoad, _Component);

  var _super = _createSuper(LazyLoad);

  function LazyLoad(props) {
    var _this;

    _classCallCheck(this, LazyLoad);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "lazyloadEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "_mounted", false);

    _defineProperty(_assertThisInitialized(_this), "state", {
      visible: false
    });

    _this.lazyLoadHandler = _this.lazyLoadHandler.bind(_assertThisInitialized(_this));

    if (props.throttle && props.throttle > 0) {
      if (props.debounce) {
        _this.lazyLoadHandler = debounce(_this.lazyLoadHandler, props.throttle);
      } else {
        _this.lazyLoadHandler = throttle(_this.lazyLoadHandler, props.throttle);
      }
    }

    _this.lazyloadEl = /*#__PURE__*/createRef();
    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(LazyLoad, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
      var eventNode = this.getEventNode();
      this.lazyLoadHandler();
      add(window, 'resize', this.lazyLoadHandler);
      add(eventNode, 'scroll', this.lazyLoadHandler);
      if (eventNode !== window) add(window, 'scroll', this.lazyLoadHandler);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.state.visible) {
        this.lazyLoadHandler();
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.visible;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      this.detachListeners();
    }
  }, {
    key: "getEventNode",
    value: function getEventNode() {
      return parentScroll(this.lazyloadEl.current);
    }
  }, {
    key: "getOffset",
    value: function getOffset() {
      var _this$props = this.props,
          offset = _this$props.offset,
          offsetVertical = _this$props.offsetVertical,
          offsetHorizontal = _this$props.offsetHorizontal,
          offsetTop = _this$props.offsetTop,
          offsetBottom = _this$props.offsetBottom,
          offsetLeft = _this$props.offsetLeft,
          offsetRight = _this$props.offsetRight,
          threshold = _this$props.threshold;

      var _offsetAll = threshold || offset;

      var _offsetVertical = offsetVertical || _offsetAll;

      var _offsetHorizontal = offsetHorizontal || _offsetAll;

      return {
        top: offsetTop || _offsetVertical,
        bottom: offsetBottom || _offsetVertical,
        left: offsetLeft || _offsetHorizontal,
        right: offsetRight || _offsetHorizontal
      };
    }
  }, {
    key: "lazyLoadHandler",
    value: function lazyLoadHandler() {
      var _this2 = this;

      if (!this._mounted) {
        return;
      }

      var offset = this.getOffset();
      var node = this.lazyloadEl.current;
      var eventNode = this.getEventNode();

      if (inViewport(node, eventNode, offset)) {
        var onContentVisible = this.props.onContentVisible;
        this.setState({
          visible: true
        }, function () {
          _this2.detachListeners();

          if (onContentVisible) {
            onContentVisible();
          }
        });
      }
    }
  }, {
    key: "detachListeners",
    value: function detachListeners() {
      var eventNode = this.getEventNode();
      remove(window, 'resize', this.lazyLoadHandler);
      remove(eventNode, 'scroll', this.lazyLoadHandler);
      if (eventNode !== window) remove(window, 'scroll', this.lazyLoadHandler);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          className = _this$props2.className,
          height = _this$props2.height,
          width = _this$props2.width;
      var visible = this.state.visible;
      var elStyles = {
        height: height,
        width: width
      };
      var elClasses = classPrefix('LazyLoad') + (visible ? ' is-visible' : '') + (className ? " ".concat(className) : '');
      return /*#__PURE__*/React.createElement(this.props.elementType, {
        className: elClasses,
        style: elStyles,
        ref: this.lazyloadEl
      }, visible && Children.only(children));
    }
  }]);

  return LazyLoad;
}(Component);

_defineProperty(LazyLoad, "defaultProps", {
  elementType: 'div',
  debounce: true,
  offset: 0,
  offsetBottom: 0,
  offsetHorizontal: 0,
  offsetLeft: 0,
  offsetRight: 0,
  offsetTop: 0,
  offsetVertical: 0,
  throttle: 250
});

export { LazyLoad as default };