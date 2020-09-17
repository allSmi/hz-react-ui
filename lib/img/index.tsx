import React, { Component } from 'react';
import './index.scss'
import classPrefix from '../class-prefix'

interface Props {
  src: string,
  className?: string,
  width?: number,
  height?: number
}

interface State {
  isLoad: boolean
}

export default class Img extends Component<Props,State> {
  private static defaultProps = {
    width: '100%',
    height: '100%'
  }
  readonly state = {
    isLoad: false
  }
  loadImg=()=>{
    let {src} = this.props
    if (src) {
      this.setState({
        isLoad: false
      })
      let img = new Image()
      img.src = src
      img.onload = ()=>{
        this.setState({
          isLoad: true
        })
      }
    }
  }
  componentDidMount(){
    this.loadImg()
  }
  componentDidUpdate(prevProps:Props){
    let {src} = this.props
    if(src !== prevProps.src){
      this.loadImg()
    }
  }
  render() {
    let {src,className,width,height} = this.props
    let {isLoad } = this.state

    return (
      <>
        {isLoad
          ? <img data-load={isLoad} src={src} className={className} alt=""/>
          : <div className={classPrefix('Img')} style={{width: width ,height: height}}></div>
        }
      </>
    );
  }
}
