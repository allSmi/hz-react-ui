import React, { Component,createRef } from 'react';
import './index.scss'
import classPrefix from '../class-prefix'

interface Props {
  click?: Function
}

export default class Overlay extends Component<Props> {
  overlayRef: React.RefObject<HTMLDivElement>
  constructor(props:Props){
    super(props)
    this.overlayRef = createRef()
  }
  componentDidMount(){
    let overlayEl = this.overlayRef.current
    overlayEl?.addEventListener('touchmove',this.touchMoveHandle,true)
    overlayEl?.addEventListener('wheel',this.touchMoveHandle,true)
  }
  touchMoveHandle=(e:Event)=>{
    e.stopPropagation()
    e.preventDefault()
  }
  scrollHandle=(e:Event)=>{
    e.stopPropagation()
    e.preventDefault()
  }
  clickHandle=()=>{
    this.props.click && this.props.click()
  }
  // new Overlay({click: ***}).show()
  show(){
    let html = document.querySelector('html') as HTMLElement
    let overlayHtml = document.createElement('div')
    overlayHtml.className = classPrefix('Overlay')
    overlayHtml.onclick = this.clickHandle
    html.appendChild(overlayHtml)
  }
  hide(){
    let html = document.querySelector('html') as HTMLElement
    let overlayHtml = document.querySelector('.' + classPrefix('Overlay')) as HTMLElement
    html.removeChild(overlayHtml)
  }
  render() {
    return (
      <div
        className={classPrefix('Overlay')}
        ref={this.overlayRef}
        onClick={this.clickHandle}
      ></div>
    );
  }
}