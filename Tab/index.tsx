import React, { Component,createRef } from 'react';
import './index.scss'
import classPrefix from '../class-prefix'
import TabItem from '../TabItem'

interface Props {
  index?: number
  onChange?: Function
  className?: string
}

interface State {
  index: number,
  style: Style,
  prevIndex: number
}

interface Style{
  translateX: number,
  width: number
}

export default class componentName extends Component<Props,State> {
  tabEl: React.RefObject<HTMLDivElement>
  constructor(props: Props){
    super(props)
    this.tabEl = createRef()
  }
  private static defaultProps = {
    index: 0
  }
  readonly state: State = {
    index: 0,
    prevIndex: 0,
    style: {
      translateX: 0,
      width: 0
    },
  }
  componentDidMount(){
    let index = this.props.index as number
    this.setState({
      index: index
    },()=>{
      setTimeout(() => {
        this.calcActiveStyle()
      },200);
    })
  }

  calcActiveStyle=()=>{
    let tabEl = this.tabEl.current as HTMLDivElement
    let index = this.state.index
    // let prevIndex = this.state.prevIndex
    let tabItem = tabEl.querySelector('.'+ classPrefix('TabItem')) as HTMLDivElement
    let tabItemWidth = tabItem.offsetWidth

    let tabItems = tabEl.querySelectorAll('.'+ classPrefix('TabItem-item'))

    if(tabItems.length){
      let activeItem = tabItems[index] as HTMLDivElement
      let activeItemWidth = activeItem.offsetWidth
      let sum = 0

      for (let i = 0; i < index; i++) {
        sum += (tabItems[i] as HTMLDivElement).offsetWidth
      }

      let translateX = sum + activeItemWidth * 0.5 - (activeItemWidth * 0.6 * 0.5)

      if(tabItem.scrollTo){
        tabItem.scrollTo({
          left: translateX - tabItemWidth / 2,
          behavior: 'smooth'
        })
      } else {
        // 兼容ie浏览器，华为浏览器
        tabItem.scrollLeft = translateX - tabItemWidth / 2
      }


      this.setState({
        style: {
          width: activeItemWidth * 0.6,
          translateX
        }
      })
    }
  }

  // componentDidUpdate(prevProps:Props){
  // }

  changeItem= (index: number)=>{
    this.setState({
      index,
      prevIndex: this.state.index
    },()=>{
      this.calcActiveStyle()
      this.props.onChange && this.props.onChange(index)
    })
  }
  render() {
    let {children,className} = this.props;
    let { index,style } = this.state
    let titles: any[] = [];
    let contents: any[] = [];

    if(children){
      if(Array.isArray(children)){
        let tabItems = children as Array<TabItem>
        tabItems.forEach((item: TabItem) => {
          let props = item.props
          titles.push(props.title)
          contents.push(props.children)
        });
      } else {
        let props = (children as TabItem).props
        titles.push(props.title)
        contents.push(props.children)
      }
    }

    return (
      <div ref={this.tabEl} className={classPrefix('Tab') + (className ? ' ' + className : '')}>
        <div className={classPrefix('TabItem')}>
          {titles.map((item,i)=>{
            return <div onClick={()=>{
                          this.changeItem(i)
                        }}
                        className={classPrefix('TabItem-item') + (i === index ? ' ' + classPrefix('TabItem-active') : '')}
                        key={i}
                    >
                    {item}
                  </div>
          })}
          <div className={classPrefix('TabItem-active-indicator')} style={{
            width: style.width + 'px',
            transform: `translateX(${style.translateX + 'px'})`
          }}></div>
        </div>
        <div className={classPrefix('Tab-content')}>
          {contents[index]}
        </div>
      </div>
    );
  }
}