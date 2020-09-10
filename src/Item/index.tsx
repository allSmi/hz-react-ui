import React, { Component } from 'react';
import '../common/css/common.scss'
import './index.scss'
import classPrefix from '../class-prefix'

interface Props {
  label?: string | number
  className?: string
  onChange?: Function
  value?: string | number
  disable?: boolean
}

interface State {
  value: string | number | undefined
}

export default class Overlay extends Component<Props,State> {
  private static defaultProps = {
    value: '',
    disable: false
  }
  readonly state = {
    value: ''
  }
  componentDidMount(){
    this.setState({
      value: this.props.value
    })
  }
  changeHandle=(e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({
      value: e.target.value
    })
    this.props.onChange && this.props.onChange({
      value: e.target.value
    })
  }
  render(){
    let {label,className,disable} = this.props
    let { value } = this.state
    return <div className={'hz__hairline-bottom ' + classPrefix('Item') + (className ? ' ' + className : '')}>
      <div className={classPrefix('Item-label')}>{label}</div>
      <div className={classPrefix('Item-input')}>
        <input value={value} disabled={disable} type="text" onChange={this.changeHandle}/>
      </div>
    </div>
  }
}