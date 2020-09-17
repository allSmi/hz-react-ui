import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import classPrefix from '../class-prefix';
import Overlay from '../overlay';

function Modal(config) {
  var _document$querySelect;

  var title = config.title,
      content = config.content,
      onOk = config.onOk,
      onCancle = config.onCancle;
  var ModalContainer = document.createElement('div');
  ModalContainer.className = classPrefix('Modal-container');
  (_document$querySelect = document.querySelector('html')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.appendChild(ModalContainer);

  function ok() {
    var _document$querySelect2;

    onOk && onOk();
    (_document$querySelect2 = document.querySelector('html')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.removeChild(ModalContainer);
  }

  function cancle() {
    var _document$querySelect3;

    onCancle && onCancle();
    (_document$querySelect3 = document.querySelector('html')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.removeChild(ModalContainer);
  }

  return ReactDOM.render( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Overlay, null), /*#__PURE__*/React.createElement("div", {
    className: classPrefix('Modal')
  }, title ? /*#__PURE__*/React.createElement("div", {
    className: classPrefix('Modal-title')
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    className: classPrefix('Modal-content') + ' ' + classPrefix('hairline-top-bottom')
  }, content), /*#__PURE__*/React.createElement("div", {
    className: classPrefix('Modal-toolbar')
  }, /*#__PURE__*/React.createElement("div", {
    className: classPrefix('Modal-cancle') + ' ' + classPrefix('hairline-right'),
    onClick: cancle
  }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement("div", {
    className: classPrefix('Modal-ok'),
    onClick: ok
  }, "\u786E\u5B9A")))), ModalContainer);
}

export default Modal;