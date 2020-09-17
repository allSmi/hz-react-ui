import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import classPrefix from '../class-prefix';
var timer;

function clearToast() {
  var toastContainer = document.querySelector('.' + classPrefix('Toast-container'));
  clearTimeout(timer);

  if (toastContainer) {
    var _document$querySelect;

    (_document$querySelect = document.querySelector('html')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.removeChild(toastContainer);
  }
}

function Toast(config) {
  var _document$querySelect2;

  clearToast();
  var content = config.content,
      _config$timeout = config.timeout,
      timeout = _config$timeout === void 0 ? 3000 : _config$timeout;
  var toastContainer = document.createElement('div');
  toastContainer.className = classPrefix('Toast-container');
  (_document$querySelect2 = document.querySelector('html')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.appendChild(toastContainer);
  timer = setTimeout(function () {
    var _document$querySelect3;

    (_document$querySelect3 = document.querySelector('html')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.removeChild(toastContainer);
  }, timeout);
  return ReactDOM.render( /*#__PURE__*/React.createElement("div", {
    className: classPrefix('Toast')
  }, content), toastContainer);
}

export default Toast;