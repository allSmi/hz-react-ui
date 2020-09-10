import React, { Children, Component } from 'react';
import { createRef } from 'react';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { add, remove } from './utils/eventlistener';
import parentScroll from './utils/parentScroll';
import inViewport from './utils/inViewport';
import classPrefix from '../class-prefix'
import "./index.scss";

interface Props {
  className?: string
  debounce?: boolean
  elementType?: string
  height?: string | number
  offset?: number
  offsetBottom?: number
  offsetHorizontal?: number
  offsetLeft?: number
  offsetRight?: number
  offsetTop?: number
  offsetVertical?: number
  threshold?: number
  throttle?: number
  width?: string | number
  onContentVisible?: Function
}

interface State {
  visible: boolean
}

export default class LazyLoad extends Component<Props> {
  lazyloadEl: React.RefObject<any>
  _mounted: boolean = false
  readonly state = {
    visible: false
  }
  private static defaultProps = {
    elementType: 'div',
    debounce: true,
    offset: 0,
    offsetBottom: 0,
    offsetHorizontal: 0,
    offsetLeft: 0,
    offsetRight: 0,
    offsetTop: 0,
    offsetVertical: 0,
    throttle: 250,
  };
  constructor(props:Props) {
    super(props);

    this.lazyLoadHandler = this.lazyLoadHandler.bind(this);

    if (props.throttle && props.throttle > 0) {
      if (props.debounce) {
        this.lazyLoadHandler = debounce(this.lazyLoadHandler, props.throttle);
      } else {
        this.lazyLoadHandler = throttle(this.lazyLoadHandler, props.throttle);
      }
    }
    this.lazyloadEl = createRef()
    this.state = { visible: false };
  }

  componentDidMount() {
    this._mounted = true;
    const eventNode = this.getEventNode();
    this.lazyLoadHandler();

    add(window, 'resize', this.lazyLoadHandler);
    add(eventNode, 'scroll', this.lazyLoadHandler);

    if (eventNode !== window) add(window, 'scroll', this.lazyLoadHandler);
  }

  componentDidUpdate() {
    if (!this.state.visible) {
      this.lazyLoadHandler();
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextState.visible;
  }

  componentWillUnmount() {
    this._mounted = false;
    this.detachListeners();
  }

  getEventNode() {
    return parentScroll(this.lazyloadEl.current);
  }

  getOffset() {
    const {
      offset, offsetVertical, offsetHorizontal,
      offsetTop, offsetBottom, offsetLeft, offsetRight, threshold,
    } = this.props;

    const _offsetAll = threshold || offset;
    const _offsetVertical = offsetVertical || _offsetAll;
    const _offsetHorizontal = offsetHorizontal || _offsetAll;

    return {
      top: offsetTop || _offsetVertical,
      bottom: offsetBottom || _offsetVertical,
      left: offsetLeft || _offsetHorizontal,
      right: offsetRight || _offsetHorizontal,
    };
  }

  lazyLoadHandler() {
    if (!this._mounted) {
      return;
    }
    const offset = this.getOffset();
    const node = this.lazyloadEl.current;
    const eventNode = this.getEventNode();

    if (inViewport(node, eventNode, offset)) {
      const { onContentVisible } = this.props;

      this.setState({ visible: true }, () => {
        this.detachListeners();
        if (onContentVisible) {
          onContentVisible();
        }
      });
    }
  }

  detachListeners() {
    const eventNode = this.getEventNode();

    remove(window, 'resize', this.lazyLoadHandler);
    remove(eventNode, 'scroll', this.lazyLoadHandler);

    if (eventNode !== window) remove(window, 'scroll', this.lazyLoadHandler);
  }

  render() {
    const { children, className, height, width } = this.props;
    const { visible } = this.state;

    const elStyles = { height, width };
    const elClasses = (
      classPrefix('LazyLoad') +
      (visible ? ' is-visible' : '') +
      (className ? ` ${className}` : '')
    );

    return React.createElement(this.props.elementType as string, {
      className: elClasses,
      style: elStyles,
      ref: this.lazyloadEl
    }, visible && Children.only(children));
  }
}
