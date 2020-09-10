import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import classPrefix from '../class-prefix'
import {Overlay} from '../'

export interface ModalConfig {
  title?: any,
  content?: any,
  onOk?: ()=>void,
  onCancle?: ()=>void
}

function Modal(config:ModalConfig){
  let {title, content, onOk, onCancle}  = config
  let ModalContainer = document.createElement('div')
  ModalContainer.className = classPrefix('Modal-container')
  document.querySelector('html')?.appendChild(ModalContainer)

  function ok(){
    onOk && onOk()
    document.querySelector('html')?.removeChild(ModalContainer)
  }

  function cancle(){
    onCancle && onCancle()
    document.querySelector('html')?.removeChild(ModalContainer)
  }

  return ReactDOM.render(
                        <>
                        <Overlay/>
                        <div className={classPrefix('Modal')}>
                          {title ? <div className={classPrefix('Modal-title')}>{title}</div> : null}
                          <div className={classPrefix('Modal-content') + ' ' + classPrefix('hairline-top-bottom')}>{content}</div>
                          <div className={classPrefix('Modal-toolbar')}>
                            <div className={classPrefix('Modal-cancle') + ' ' + classPrefix('hairline-right')} onClick={cancle}>取消</div>
                            <div className={classPrefix('Modal-ok')} onClick={ok}>确定</div>
                          </div>
                        </div>
                        </>, ModalContainer)
}



export default Modal
