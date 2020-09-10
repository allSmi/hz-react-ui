export default function(className: string){
  let classArray = className.split(' ')
  let temp = classArray.map(item => {
    return item ? 'hz__' + item : ''
  })
  return temp.join(' ')
}