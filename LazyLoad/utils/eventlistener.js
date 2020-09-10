function wrap(standard, fallback) {
  return function (el, evtName, listener, useCapture) {
    if (el[standard]) {
      el[standard](evtName, listener, useCapture);
    } else if (el[fallback]) {
      el[fallback]('on' + evtName, listener);
    }
  }
}

export let add = wrap('addEventListener', 'attachEvent')
export let remove = wrap('removeEventListener', 'detachEvent')