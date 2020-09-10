import React, { Component,createRef } from 'react';
import './index.scss'
import classPrefix from '../class-prefix'
import Overlay from '../Overlay'

interface Props {
  show?:boolean
  onCancle?:Function
  onOk?:Function,
  columns: Array<any>
}

interface State {
  translate: number
  itemHeight: number
  animate: boolean
}

export default class Picker extends Component<Props, State> {
  private static defaultProps = {
    columns: []
  }
  readonly state = {
    itemHeight: 0,
    translate: 0,
    animate: false
  }
  pickerRef: React.RefObject<HTMLDivElement>
  initClientY= 0
  initTanslateY= 0
  constructor(props:Props){
    super(props)
    this.pickerRef = createRef()
  }
  componentDidMount(){
    let pickerEl = this.pickerRef.current
    pickerEl?.addEventListener('touchmove',this.touchMoveHandle,true)
    pickerEl?.addEventListener('wheel',this.touchMoveHandle,true)

    this.init()
  }
  init(){
    let toolbarEl = document.querySelector(`.${classPrefix('Picker-toolbar')}`) as HTMLDivElement
    let itemHeight = toolbarEl.offsetHeight

    this.initTanslateY = itemHeight * 2
    this.setState({
      translate: itemHeight * 2,
      itemHeight
    })
  }
  static getDerivedStateFromProps(props:Props,state:State){
    return null
  }
  componentDidUpdate(prevProps:Props, prevState:State){
    // 比较两次数据，如果不同执行init
    if (prevProps.columns.length !== this.props.columns.length) {
      this.init()
    } else if (JSON.stringify(prevProps.columns) !== JSON.stringify(this.props.columns)){
      this.init()
    }
  }
  overlayClick=()=>{
    this.props.onCancle && this.props.onCancle()
  }
  cancleHandle=()=>{
    this.props.onCancle && this.props.onCancle()
  }
  confirmHandle=()=>{
    let {translate,itemHeight} = this.state
    let { columns }=this.props
    let select = columns[((itemHeight * 2 - translate) / itemHeight)]

    this.props.onOk && this.props.onOk({data: select})
  }
  touchMoveHandle=(e:Event)=>{
    e.preventDefault()
  }
  pickerTouchstartHandle=(e:React.TouchEvent)=>{
    this.initClientY = e.touches[0].clientY
    this.setState({
      animate: false
    })
  }
  pickerTouchmoveHandle=(e:React.TouchEvent)=>{
    let diffY = this.initClientY - e.touches[0].clientY
    let move = this.initTanslateY - diffY

    if( move <= this.state.itemHeight * 2 &&  move >= -(this.state.itemHeight * this.props.columns.length - this.state.itemHeight * 2 - this.state.itemHeight) ) {
      this.setState({
        translate:  this.initTanslateY - diffY
      })
    }
  }
  pickerTouchendHandle=(e:React.TouchEvent)=>{
    let {translate,itemHeight} = this.state

    let index = Math.round((this.state.itemHeight * 2 - translate) / itemHeight)

    this.setState({
      translate : itemHeight * 2 - (index * itemHeight),
      animate: true
    },()=>{
      this.initTanslateY = this.state.translate
    })
  }
  scrollHandle=(e:Event)=>{
    e.stopPropagation()
    e.preventDefault()
  }
  render() {
    let { show, columns } = this.props
    let { translate, itemHeight, animate} = this.state
    return (
      <>
      {show ? <Overlay click={this.overlayClick}/> : null}
      <div ref={this.pickerRef} className={classPrefix('Picker ') + (show ? classPrefix('Picker-show') : classPrefix('Picker-hide'))}>
        <div className={classPrefix('Picker-toolbar')}>
          <div className={classPrefix('Picker-toolbar-item')} onClick={this.cancleHandle}>取消</div>
          <div className={classPrefix('Picker-toolbar-item')} onClick={this.confirmHandle}>确认</div>
        </div>
        <div className={classPrefix('Picker-columns')} style={{height: itemHeight * 5 + 'px'}} onTouchStart={this.pickerTouchstartHandle} onTouchEnd={this.pickerTouchendHandle} onTouchMove={this.pickerTouchmoveHandle}>
          <ul style={{transform: 'translate3d(0,'+ translate +'px,0)',height: itemHeight * columns.length + 'px'}} className={classPrefix('Picker-column') + (animate ? ' ' + classPrefix('Picker-animate') : '')}>
            {columns.map(item=>{
              return <li className={classPrefix('Picker-column-item')} key={item}>{item}</li>
            })}
          </ul>
          <div className={classPrefix('Picker-mask')}></div>
          <div className={'hz__hairline-top-bottom ' + classPrefix('Picker-select')}></div>
        </div>
      </div>
      </>
    )
  }
}