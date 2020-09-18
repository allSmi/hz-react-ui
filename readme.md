# just try to write a baseComponents for react

## Tip：为了熟悉react和感受一下如何开发一个ui库，由于知识储备还不够，目前这个库还很粗糙
-----

## 这只是一个非常基础的手机端ui组件库，包括的组件有：
### Upload  选择图片并返显
### Picker  picker弹窗，单列
### Item  简单的文字和输入框的组合
### List  下拉刷新，下拉加载
### Toast 页面提示
### Modal 页面确认窗
### Overlay 页面蒙版
### Img 图片load后显示
### Lazyload  懒加载（借鉴react-lazy-load这个库）
### Tab TabItem 标签切换

-----

## 如果你想试一下这个ui，那么你需要有以下配置

```
npm install hz-react-ui -S
npm install babel-plugin-import -D
```

``` js
// babel.config.js
"plugins": [
    ['import', {
      libraryName: 'hz-react-ui',
      libraryDirectory: 'lib',
      style: true
    }, 'hz-react-ui']
  ]
```

## 目前库中的样式使用scss写的，并没有编译为css,需要自行安装和配置scss相关的npm包和webpack配置,源码中src文件夹为源代码，lib文件夹是用bable编译后的代码
------
## 目前组件相关的说明还没有，后续有时间还会慢慢加上以及增加一些功能（实用的组件，国际化等）