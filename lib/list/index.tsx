import React, { createRef, PureComponent } from "react";
import loadingImg from "./images/loading.gif";
import classPrefix from '../class-prefix'
import "./index.scss";

// todo 修改上拉下拉判断逻辑  组件不用 module.scss
// if(下拉){
//   if(scrollTop === 0){
//     下拉刷新
//   }
// }else if(上拉){
//   if(滚动到底部){
//     上拉加载
//   }
// }



interface State {
  refreshStyle: {
    transform: string;
  };
  tip: string;
  animate: boolean; // 是否开启过渡动画
  isReachBottom: boolean; // 是否到达底部
}

interface Props {
  refresh?: boolean; // 是否开启下拉刷新
  load?: boolean; // 是否开启上拉加载
  isRefresh?: boolean;
  onRefresh?: Function;
  height?: number;
  isLoad?: boolean;
  onLoad?: Function;
  offset?: number; // 设置为负数不启动上拉加载
  finish?: boolean; // 上拉刷新是否结束
  finishText?: any
}

function direction(y:number,lastY:number): number{
  let diffY = y - lastY
  if(diffY > 0) {
    // 下拉
    return 1
  } else if(diffY < 0){
    // 上拉
    return -1
  } else {
    return 0
  }
}

// const loadTimeout = 1000
let loadTimer:any;

// 下拉刷新，上拉加载
export default class List extends PureComponent<Props, State> {
  initflag: boolean = true; // 组件初始化标记
  touchStartY: number = 0; // touchStart 时坐标
  loadingHeight: number = 0; // loading的高度
  translateY: number = 0; // loading的高度取反
  diffY: number = 0; // 下拉的距离
  beforeRefreshTipText: string = "下拉即可刷新...";
  prepareRefreshTipText: string = "松开即可刷新...";
  processRefreshTipText: string = "正在加载...";
  offset: number = 0; // 到达底部距离
  listEl: React.RefObject<HTMLDivElement>;
  loadingEl: any;
  contentEl: any
  moreLoadEl: any
  containerEl: any
  loading: boolean= false

  // 默认props 第一种写法
  private static defaultProps = {
    refresh: true,
    load: false,
    finishText: '没有更多了'
  };

  readonly state = {
    refreshStyle: {
      transform: `translateY(${this.translateY}px)`,
    },
    tip: this.beforeRefreshTipText,
    animate: false,
    isReachBottom: false,
  };

  constructor(props: Props) {
    super(props);
    this.listEl = createRef();
    this.offset = props.offset || 0;
  }

  componentWillUnmount(){
    clearTimeout(loadTimer)
  }

  componentDidMount() {
    this.initflag = false;

    let listEl = this.listEl.current as HTMLElement;
    this.loadingEl = listEl.querySelector("." + classPrefix('List-loading')) as HTMLDivElement;
    this.contentEl = listEl.querySelector("." + classPrefix('List-content')) as HTMLDivElement;
    this.containerEl = listEl.querySelector("." + classPrefix('List-container')) as HTMLDivElement;
    this.moreLoadEl = listEl.querySelector("." + classPrefix('List-more_load')) as HTMLDivElement;

    this.containerEl.addEventListener("touchmove", this.touchMoveHandle, true);
    this.containerEl.addEventListener("scroll", this.scrollHandle, true);

    let height = this.loadingEl.offsetHeight as number;

    this.loadingHeight = height;
    this.translateY = -height;

    this.setState({
      refreshStyle: {
        transform: `translateY(${this.translateY}px)`,
      },
    });

    if(this.props.isLoad) {
      this.startLoad()
    }
  }

  componentDidUpdate(prevProps: Props) {
    let isRefresh = this.props.isRefresh;
    let isLoad = this.props.isLoad;

    if (prevProps.isRefresh !== isRefresh) {
      if (!isRefresh) {
        this.stopPullDownRefresh();
        this.startLoad();
      }
    }

    if (prevProps.isLoad !== isLoad) {
      if(isLoad){
        this.startLoad();
      }else{
        this.loading = false
        if(this.moreLoadInViewport()){
          this.startLoad();
        }
      }
    }
  }

  touchStartHandle = (event: React.TouchEvent<HTMLDivElement>) => {
    if (this.props.isRefresh) {
      return;
    }

    if (this.props.isLoad) {
      return;
    }

    this.touchStartY = event.touches[0].clientY

    this.setState({
      animate: false,
    });
  };
  // https://zhuanlan.zhihu.com/p/84255231 Chrome在54之后为了优化移动端性能, 默认在document上以passive:true方式绑定了滚动监器, 导致React中事件处理接口的preventDefault方法失效. 最佳解决方案当然是React在框架层面给与支持, 但看了一下, 相关issue从16年提出来, 到现在还没被修复...
  touchMoveHandle = (event: TouchEvent) => {
    if (this.props.isRefresh) {
      return;
    }

    if (this.props.isLoad) {
      return;
    }

    let currentTarget = event.currentTarget as HTMLElement;
    let scrollTop = currentTarget.scrollTop;
    let clientY = event.touches[0].clientY;

    // 如果是下拉，并且scrollTop === 0 ---> 下拉刷新
    if(direction(clientY, this.touchStartY) === 1 && scrollTop === 0) {
      // 当触发下拉刷新时阻止默认滚动事件
      event.preventDefault();
      this.diffY = event.touches[0].clientY - this.touchStartY;

      this.setState({
        refreshStyle: {
          transform: `translateY(${
            this.diffY >= this.loadingHeight
              ? this.translateY + this.loadingHeight
              : this.translateY + this.diffY
          }px)`,
        },
        tip:
          this.diffY >= this.loadingHeight
            ? this.prepareRefreshTipText
            : this.beforeRefreshTipText,
      });
    } else {
      if(this.moreLoadInViewport() && !this.props.finish){
        this.startLoad()
      }
    }
  };
  scrollHandle=(e:any)=>{
    if(this.moreLoadInViewport() && !this.props.finish){
      this.startLoad()
    }
  }

  moreLoadInViewport=()=>{
    // 判断List-more_load是否在可视区 ,加载更多
    if(this.loadingEl.offsetHeight + this.contentEl.offsetHeight <= this.containerEl.offsetHeight){
      return true
    }else{
      if(this.loadingEl.offsetHeight + this.contentEl.offsetHeight <= this.containerEl.offsetHeight + this.containerEl.scrollTop){
        return true
      }
    }
    return false
  }

  touchEndHandle = (event: React.TouchEvent) => {
    if (this.props.isRefresh) {
      return;
    }

    if (this.props.isLoad) {
      return;
    }

    if (this.diffY >= this.loadingHeight) {
      // 触发refresh事件
      this.startPullDownRefresh()
    } else {
      this.touchStartY = 0;
      this.diffY = 0;
      this.setState({
        refreshStyle: {
          transform: `translateY(${this.translateY}px)`,
        },
        animate: false,
      });
    }
  };
  startPullDownRefresh=()=> {
    if (this.props.isLoad) {
      return;
    }

    this.setState({
      refreshStyle: {
        transform: `translateY(${this.translateY + this.loadingHeight}px)`,
      },
      tip: this.processRefreshTipText,
      animate: true,
    });
    // 触发refresh事件
    this.props.onRefresh && this.props.onRefresh();
  }
  stopPullDownRefresh=()=> {
    this.touchStartY = 0;
    this.setState({
      refreshStyle: {
        transform: `translateY(${this.translateY}px)`,
      },
      animate: true,
    });
    this.diffY = 0;
  }
  startLoad = () => {
    if(!this.props.finish && !this.loading){
      this.loading = true
      if(this.moreLoadInViewport()){
        // 触发onLoad事件
        this.props.onLoad && this.props.onLoad();
      } else {
        this.loading = false
      }
    }
  };
  render() {
    let { children, height, finish, isRefresh,finishText } = this.props;
    let { refreshStyle, tip, animate} = this.state;

    return (
      <div
        ref={this.listEl}
        className={classPrefix('List')}
        style={{ height: height ? height + "px" : "100%" }}
      >
        <div
          className={classPrefix('List-container') + " " + (animate ? classPrefix('List-animate') : "")}
          onTouchStart={this.touchStartHandle}
          onTouchEnd={this.touchEndHandle}
          style={this.initflag ? {} : refreshStyle}
        >
          <div className={classPrefix('List-loading')}>
            {isRefresh ? <img src={loadingImg} alt="" /> : null}
            {tip}
          </div>
          <div className={classPrefix('List-content')}>
            {children}
          </div>
          {finish && !isRefresh ?
            <div
            className={classPrefix('List-finish')}
            >
              {finishText}
            </div> : null}
            {!finish && !isRefresh ?<div
              className={classPrefix('List-more_load')}
              style={{ visibility: "visible" }}
            >
              <img src={loadingImg} alt="" />
              努力加载中...
            </div>:null}
        </div>
      </div>
    );
  }
}

// 默认props 第二种写法
// (List as any).defaultProps = {
//   refresh: true,
//   load: false,
// };
