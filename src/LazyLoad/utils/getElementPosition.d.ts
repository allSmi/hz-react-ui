/*
* Finds element's position relative to the whole document,
* rather than to the viewport as it is the case with .getBoundingClientRect().
*/
declare interface value {
  top: number
  left: number
}

export default function getElementPosition(element): value
