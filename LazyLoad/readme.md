# 该组件来自react-lazy-load（https://github.com/loktar00/react-lazy-load）
##对其进行优化，有以下改动
### 1. 修改了react不建议使用的声明周期函数 componentWillReceiveProps 修改为  componentDidUpdate
---
### 2. react-dom上废弃的方法 findDOMNode  修改为使用 react.createRef
---
### 3. 修改了调用lazyLoadHandler方法中调用detachListeners的时机
---
### 4. 修改为ts版本
---

``` js
// 修改前
this.setState({ visible: true }, () => {
  if (onContentVisible) {
    onContentVisible();
  }
});
this.detachListeners();
```
``` js
// 修改后
this.setState({ visible: true }, () => {
  this.detachListeners();
  if (onContentVisible) {
    onContentVisible();
  }
});
```