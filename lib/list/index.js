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

import React, { createRef, PureComponent } from "react";
import loadingImg from "./images/loading.gif";
import classPrefix from '../class-prefix';
import "./index.scss"; // todo 修改上拉下拉判断逻辑  组件不用 module.scss
// if(下拉){
//   if(scrollTop === 0){
//     下拉刷新
//   }
// }else if(上拉){
//   if(滚动到底部){
//     上拉加载
//   }
// }

function direction(y, lastY) {
  var diffY = y - lastY;

  if (diffY > 0) {
    // 下拉
    return 1;
  } else if (diffY < 0) {
    // 上拉
    return -1;
  } else {
    return 0;
  }
} // const loadTimeout = 1000


var loadTimer; // 下拉刷新，上拉加载

var List = /*#__PURE__*/function (_PureComponent) {
  _inherits(List, _PureComponent);

  var _super = _createSuper(List);

  // 组件初始化标记
  // touchStart 时坐标
  // loading的高度
  // loading的高度取反
  // 下拉的距离
  // 到达底部距离
  // 默认props 第一种写法
  function List(props) {
    var _this;

    _classCallCheck(this, List);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "initflag", true);

    _defineProperty(_assertThisInitialized(_this), "touchStartY", 0);

    _defineProperty(_assertThisInitialized(_this), "loadingHeight", 0);

    _defineProperty(_assertThisInitialized(_this), "translateY", 0);

    _defineProperty(_assertThisInitialized(_this), "diffY", 0);

    _defineProperty(_assertThisInitialized(_this), "beforeRefreshTipText", "下拉即可刷新...");

    _defineProperty(_assertThisInitialized(_this), "prepareRefreshTipText", "松开即可刷新...");

    _defineProperty(_assertThisInitialized(_this), "processRefreshTipText", "正在加载...");

    _defineProperty(_assertThisInitialized(_this), "offset", 0);

    _defineProperty(_assertThisInitialized(_this), "listEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "loadingEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "contentEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "moreLoadEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "containerEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "loading", false);

    _defineProperty(_assertThisInitialized(_this), "state", {
      refreshStyle: {
        transform: "translateY(".concat(_this.translateY, "px)")
      },
      tip: _this.beforeRefreshTipText,
      animate: false,
      isReachBottom: false
    });

    _defineProperty(_assertThisInitialized(_this), "touchStartHandle", function (event) {
      if (_this.props.isRefresh) {
        return;
      }

      if (_this.props.isLoad) {
        return;
      }

      _this.touchStartY = event.touches[0].clientY;

      _this.setState({
        animate: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "touchMoveHandle", function (event) {
      if (_this.props.isRefresh) {
        return;
      }

      if (_this.props.isLoad) {
        return;
      }

      var currentTarget = event.currentTarget;
      var scrollTop = currentTarget.scrollTop;
      var clientY = event.touches[0].clientY; // 如果是下拉，并且scrollTop === 0 ---> 下拉刷新

      if (direction(clientY, _this.touchStartY) === 1 && scrollTop === 0) {
        // 当触发下拉刷新时阻止默认滚动事件
        event.preventDefault();
        _this.diffY = event.touches[0].clientY - _this.touchStartY;

        _this.setState({
          refreshStyle: {
            transform: "translateY(".concat(_this.diffY >= _this.loadingHeight ? _this.translateY + _this.loadingHeight : _this.translateY + _this.diffY, "px)")
          },
          tip: _this.diffY >= _this.loadingHeight ? _this.prepareRefreshTipText : _this.beforeRefreshTipText
        });
      } else {
        if (_this.moreLoadInViewport() && !_this.props.finish) {
          _this.startLoad();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "scrollHandle", function (e) {
      if (_this.moreLoadInViewport() && !_this.props.finish) {
        _this.startLoad();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "moreLoadInViewport", function () {
      // 判断List-more_load是否在可视区 ,加载更多
      if (_this.loadingEl.offsetHeight + _this.contentEl.offsetHeight <= _this.containerEl.offsetHeight) {
        return true;
      } else {
        if (_this.loadingEl.offsetHeight + _this.contentEl.offsetHeight <= _this.containerEl.offsetHeight + _this.containerEl.scrollTop) {
          return true;
        }
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "touchEndHandle", function (event) {
      if (_this.props.isRefresh) {
        return;
      }

      if (_this.props.isLoad) {
        return;
      }

      if (_this.diffY >= _this.loadingHeight) {
        // 触发refresh事件
        _this.startPullDownRefresh();
      } else {
        _this.touchStartY = 0;
        _this.diffY = 0;

        _this.setState({
          refreshStyle: {
            transform: "translateY(".concat(_this.translateY, "px)")
          },
          animate: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "startPullDownRefresh", function () {
      if (_this.props.isLoad) {
        return;
      }

      _this.setState({
        refreshStyle: {
          transform: "translateY(".concat(_this.translateY + _this.loadingHeight, "px)")
        },
        tip: _this.processRefreshTipText,
        animate: true
      }); // 触发refresh事件


      _this.props.onRefresh && _this.props.onRefresh();
    });

    _defineProperty(_assertThisInitialized(_this), "stopPullDownRefresh", function () {
      _this.touchStartY = 0;

      _this.setState({
        refreshStyle: {
          transform: "translateY(".concat(_this.translateY, "px)")
        },
        animate: true
      });

      _this.diffY = 0;
    });

    _defineProperty(_assertThisInitialized(_this), "startLoad", function () {
      if (!_this.props.finish && !_this.loading) {
        _this.loading = true;

        if (_this.moreLoadInViewport()) {
          // 触发onLoad事件
          _this.props.onLoad && _this.props.onLoad();
        } else {
          _this.loading = false;
        }
      }
    });

    _this.listEl = /*#__PURE__*/createRef();
    _this.offset = props.offset || 0;
    return _this;
  }

  _createClass(List, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(loadTimer);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initflag = false;
      var listEl = this.listEl.current;
      this.loadingEl = listEl.querySelector("." + classPrefix('List-loading'));
      this.contentEl = listEl.querySelector("." + classPrefix('List-content'));
      this.containerEl = listEl.querySelector("." + classPrefix('List-container'));
      this.moreLoadEl = listEl.querySelector("." + classPrefix('List-more_load'));
      this.containerEl.addEventListener("touchmove", this.touchMoveHandle, true);
      this.containerEl.addEventListener("scroll", this.scrollHandle, true);
      var height = this.loadingEl.offsetHeight;
      this.loadingHeight = height;
      this.translateY = -height;
      this.setState({
        refreshStyle: {
          transform: "translateY(".concat(this.translateY, "px)")
        }
      });

      if (this.props.isLoad) {
        this.startLoad();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var isRefresh = this.props.isRefresh;
      var isLoad = this.props.isLoad;

      if (prevProps.isRefresh !== isRefresh) {
        if (!isRefresh) {
          this.stopPullDownRefresh();
          this.startLoad();
        }
      }

      if (prevProps.isLoad !== isLoad) {
        if (isLoad) {
          this.startLoad();
        } else {
          this.loading = false;

          if (this.moreLoadInViewport()) {
            this.startLoad();
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          height = _this$props.height,
          finish = _this$props.finish,
          isRefresh = _this$props.isRefresh,
          finishText = _this$props.finishText;
      var _this$state = this.state,
          refreshStyle = _this$state.refreshStyle,
          tip = _this$state.tip,
          animate = _this$state.animate;
      return /*#__PURE__*/React.createElement("div", {
        ref: this.listEl,
        className: classPrefix('List'),
        style: {
          height: height ? height + "px" : "100%"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: classPrefix('List-container') + " " + (animate ? classPrefix('List-animate') : ""),
        onTouchStart: this.touchStartHandle,
        onTouchEnd: this.touchEndHandle,
        style: this.initflag ? {} : refreshStyle
      }, /*#__PURE__*/React.createElement("div", {
        className: classPrefix('List-loading')
      }, isRefresh ? /*#__PURE__*/React.createElement("img", {
        src: loadingImg,
        alt: ""
      }) : null, tip), /*#__PURE__*/React.createElement("div", {
        className: classPrefix('List-content')
      }, children), finish && !isRefresh ? /*#__PURE__*/React.createElement("div", {
        className: classPrefix('List-finish')
      }, finishText) : null, !finish && !isRefresh ? /*#__PURE__*/React.createElement("div", {
        className: classPrefix('List-more_load'),
        style: {
          visibility: "visible"
        }
      }, /*#__PURE__*/React.createElement("img", {
        src: loadingImg,
        alt: ""
      }), "\u52AA\u529B\u52A0\u8F7D\u4E2D...") : null));
    }
  }]);

  return List;
}(PureComponent); // 默认props 第二种写法
// (List as any).defaultProps = {
//   refresh: true,
//   load: false,
// };


_defineProperty(List, "defaultProps", {
  refresh: true,
  load: false,
  finishText: '没有更多了'
});

export { List as default };