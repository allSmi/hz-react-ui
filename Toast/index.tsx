import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import classPrefix from '../class-prefix'

export interface config {
  content: any,
  timeout?: number
}

let timer: any

function clearToast(){
  let toastContainer = document.querySelector('.' + classPrefix('Toast-container'))

  clearTimeout(timer)

  if(toastContainer){
    document.querySelector('html')?.removeChild(toastContainer)
  }
}

function Toast(config:config){
  clearToast()
  let {content,timeout=3000}  = config
  let toastContainer = document.createElement('div')
  toastContainer.className = classPrefix('Toast-container')
  document.querySelector('html')?.appendChild(toastContainer)

  timer = setTimeout(() => {
    document.querySelector('html')?.removeChild(toastContainer)
  }, timeout);

  return ReactDOM.render(<div className={classPrefix('Toast')}>{content}</div>, toastContainer)
}

export default Toast
