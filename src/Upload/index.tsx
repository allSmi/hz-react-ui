import React, { Component,createRef } from 'react';

import classPrefix from '../class-prefix'

import './index.scss'


interface Props {
  afterRead: (result: Result)=>void
}

interface State {
  img: Array<string>
}

interface Result {
  file: File,
  content: string
}

export default class Upload extends Component<Props,State> {
  inputRef: React.RefObject<HTMLInputElement>

  constructor(props:Props){
    super(props)
    this.inputRef = createRef()
  }
  readonly state = {
    img: []
  }
  fileHandle=(file: File)=>{
    let result = {
      content: '',
      file: file
    }

    let fileReader = new FileReader()
    // fileReader.onloadend
    fileReader.onload = (e) => {
      result.content = e.target?.result as string
      // let src = window.URL.createObjectURL(file) // file blob
      // let src = window.URL.createObjectURL(new Blob([result.content]))
      // let src = window.URL.createObjectURL(new Blob([result.content],{type: 'image/png'}))
      this.props.afterRead && this.props.afterRead(result)
      // this.setState((state: State, props: Props)=>{
      //   return {
      //     img: state.img.concat([result.content])
      //   }
      // },()=>{
      //   console.log(this.state);
      // })
    }

    fileReader.readAsDataURL(file) // base64
    // fileReader.readAsArrayBuffer(file) // window.URL.createObjectURL(new Blob([result.content]))
    // fileReader.readAsBinaryString(file) // 不能返显不能下载  (该方法已从 FileAPI 标准移除，请使用 FileReader.readAsArrayBuffer() 代替。)
  }
  fileChangeHandle=(e: React.ChangeEvent<HTMLInputElement>)=>{
    let fileList = e.target.files as FileList
    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      this.fileHandle(file)
    }
  }
  dropHandle=(e: React.DragEvent)=>{
    e.stopPropagation();
    e.preventDefault();

    let dt = e.dataTransfer
    let fileList = dt.files

    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index];
      this.fileHandle(file)
    }
  }
  triggerInput=()=>{
    this.inputRef.current?.click()
  }
  render() {
    let { children } = this.props

    return (
      <div className={classPrefix('upload-input-contain')} onClick={this.triggerInput}>
        { children ? children : null }
        <input ref={this.inputRef} style={{display:"none"}} type="file" onChange={this.fileChangeHandle} onDrop={this.dropHandle}/>
      </div>
    );
  }
}
