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
import classPrefix from '../class-prefix';
import './index.scss';

var Upload = /*#__PURE__*/function (_Component) {
  _inherits(Upload, _Component);

  var _super = _createSuper(Upload);

  function Upload(props) {
    var _this;

    _classCallCheck(this, Upload);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "inputRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      img: []
    });

    _defineProperty(_assertThisInitialized(_this), "fileHandle", function (file) {
      var result = {
        content: '',
        file: file
      };
      var fileReader = new FileReader(); // fileReader.onloadend

      fileReader.onload = function (e) {
        var _e$target;

        result.content = (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.result; // let src = window.URL.createObjectURL(file) // file blob
        // let src = window.URL.createObjectURL(new Blob([result.content]))
        // let src = window.URL.createObjectURL(new Blob([result.content],{type: 'image/png'}))

        _this.props.afterRead && _this.props.afterRead(result); // this.setState((state: State, props: Props)=>{
        //   return {
        //     img: state.img.concat([result.content])
        //   }
        // },()=>{
        //   console.log(this.state);
        // })
      };

      fileReader.readAsDataURL(file); // base64
      // fileReader.readAsArrayBuffer(file) // window.URL.createObjectURL(new Blob([result.content]))
      // fileReader.readAsBinaryString(file) // 不能返显不能下载  (该方法已从 FileAPI 标准移除，请使用 FileReader.readAsArrayBuffer() 代替。)
    });

    _defineProperty(_assertThisInitialized(_this), "fileChangeHandle", function (e) {
      var fileList = e.target.files;

      for (var index = 0; index < fileList.length; index++) {
        var file = fileList[index];

        _this.fileHandle(file);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "dropHandle", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var dt = e.dataTransfer;
      var fileList = dt.files;

      for (var index = 0; index < fileList.length; index++) {
        var file = fileList[index];

        _this.fileHandle(file);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "triggerInput", function () {
      var _this$inputRef$curren;

      (_this$inputRef$curren = _this.inputRef.current) === null || _this$inputRef$curren === void 0 ? void 0 : _this$inputRef$curren.click();
    });

    _this.inputRef = /*#__PURE__*/createRef();
    return _this;
  }

  _createClass(Upload, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          type = _this$props.type;
      return /*#__PURE__*/React.createElement("div", {
        className: classPrefix('upload-input-contain'),
        onClick: this.triggerInput
      }, children ? children : null, /*#__PURE__*/React.createElement("input", {
        ref: this.inputRef,
        style: {
          display: "none"
        },
        type: type,
        onChange: this.fileChangeHandle,
        onDrop: this.dropHandle
      }));
    }
  }]);

  return Upload;
}(Component);

_defineProperty(Upload, "defaultProps", {
  type: 'file'
});

export { Upload as default };