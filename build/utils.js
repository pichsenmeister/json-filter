"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// obj1 has to be the mask
// obj2 has to be the full JSON tree
var compareObj = function compareObj(obj1, obj2) {
  // loop through properties in object 1
  for (var p in obj1) {
    // check property exists on both objects
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
      return false;
    }

    switch (_typeof(obj1[p])) {
      case 'object':
        if (obj1[p] instanceof RegExp && typeof obj2[p] === 'string') {
          return obj1[p].test(obj2[p]);
        }

        if (!compareObj(obj1[p], obj2[p])) return false;
        break;

      default:
        return obj1[p] === '$any' || obj1[p] === obj2[p];
    }
  }

  return true;
};

module.exports = {
  compareObj: compareObj
};