function wrap(standard, fallback) {
  return function (el, evtName, listener, useCapture) {
    if (el[standard]) {
      el[standard](evtName, listener, useCapture);
    } else if (el[fallback]) {
      el[fallback]('on' + evtName, listener);
    }
  };
}

export var add = wrap('addEventListener', 'attachEvent');
export var remove = wrap('removeEventListener', 'detachEvent');