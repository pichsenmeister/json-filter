"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var compareObj = function compareObj(obj1, obj2) {
  // loop through properties in object 1
  for (var p in obj1) {
    // check property exists on both objects
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

    switch (_typeof(obj1[p])) {
      case 'object':
        if (!compareObj(obj1[p], obj2[p])) return false;
        break;

      default:
        return obj1[p] === obj2[p];
    }
  } // check object 2 for any extra properties


  for (var _p in obj2) {
    if (typeof obj1[_p] === 'undefined') return false;
  }

  return true;
};

module.exports = {
  compareObj: compareObj
};