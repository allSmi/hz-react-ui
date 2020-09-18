import React, { Component,createRef } from 'react';
import './index.scss'
import classPrefix from '../class-prefix'

interface Props {
  src: string,
  className?: string,
  width?: number,
  height?: number,
  mode?: string  // center cover
}

interface State {
  isLoad: boolean
}

export default class Img extends Component<Props,State> {
  imgPlaceholder: React.RefObject<HTMLDivElement>
  constructor(props: Props){
    super(props)
    this.imgPlaceholder = createRef();
  }
  private static defaultProps = {
    width: '100%',
    height: '100%',
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
        let parentElement = this.imgPlaceholder.current as HTMLDivElement;
        let ancestorsElement = parentElement.parentElement as HTMLDivElement;

        let reg = new RegExp('\\s?' + classPrefix('Img') + '-.*', 'g')
        ancestorsElement.className = ancestorsElement.className.replace(reg,'')

        if (this.props.mode === 'cover') {
          let imgRatio = img.naturalWidth / img.naturalHeight;
          let parentStyle = parentElement.getBoundingClientRect();
          let containerRatio = parentStyle.width / parentStyle.height;

          if (imgRatio > containerRatio) {
            ancestorsElement.className += ' ' + classPrefix('Img-height');
          } else if (imgRatio < containerRatio) {
            ancestorsElement.className += ' ' + classPrefix('Img-width');
          } else {
            ancestorsElement.className += ' ' + classPrefix('Img-center');
          }
        } else if (this.props.mode === 'center') {
          ancestorsElement.className += ' ' + classPrefix('Img-center');
        }

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
          ? <img data-load={isLoad} src={src} className={classPrefix('Img') + (className ? ' ' + className : '')} alt=""/>
          : <div ref={this.imgPlaceholder} className={classPrefix('Img') + (className ? ' ' + className : '')} style={{width: width ,height: height}}></div>
        }
      </>
    );
  }
}
