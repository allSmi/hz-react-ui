import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.split";
export default function (className) {
  var classArray = className.split(' ');
  var temp = classArray.map(function (item) {
    return item ? 'hz__' + item : '';
  });
  return temp.join(' ');
}