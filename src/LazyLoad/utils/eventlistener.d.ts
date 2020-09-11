declare type listener = (el, evtName, listener, useCapture?) => void;
declare function wrap(standard,fallback) : listener

export let add: listener
export let remove: listener