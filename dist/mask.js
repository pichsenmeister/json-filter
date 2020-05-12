"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var utils = require('./utils');

var match = function match(tree, mask, trim) {
  // TODO implement trim
  trim = trim || false;
  if (_typeof(tree) !== 'object') throw new Error('invalid JSON');
  if (_typeof(mask) !== 'object') throw new Error('invalid JSON filter object');
  if (Array.isArray(mask)) throw new Error('invalid JSON filter object');
  var results = [];

  switch (_typeof(tree)) {
    case 'object':
      results = _parseMask(tree, mask, trim, results);
      break;
  }

  return _generateResultObj(results);
};

var _generateResultObj = function _generateResultObj(results) {
  var obj = {};
  obj.length = results.length;

  obj.first = function () {
    return results.length ? results[0] : undefined;
  };

  obj.last = function () {
    return results.length ? results[results.length - 1] : undefined;
  };

  obj.get = function (index) {
    if (index > results.length - 1) return undefined;
    return results[index];
  };

  obj.all = function () {
    return results;
  };

  return obj;
};

var _parseMask = function _parseMask(tree, mask, trim, results) {
  var maskKeys = Object.keys(mask);

  if (Array.isArray(tree)) {
    tree.map(function (item) {
      return _parseMask(item, mask, trim, results);
    });
  } else {
    // get keys of current tree
    var treeKeys = Object.keys(tree); // check length if all maskKeys are part of this structure and their values are equal

    var isSubMask = maskKeys.filter(function (val) {
      return treeKeys.indexOf(val) >= 0;
    }).length === maskKeys.length; // if keys match, check their value

    if (isSubMask) {
      var filter = maskKeys.filter(function (item) {
        if (typeof tree[item] === 'string' && mask[item] instanceof RegExp) {
          return mask[item].test(tree[item]);
        } else if (_typeof(mask[item]) !== 'object') {
          return tree[item] === mask[item] || mask[item] === '$any';
        }

        return utils.compareObj(mask[item], tree[item]);
      });

      if (filter.length === maskKeys.length) {
        if (trim) {
          results.push(_trim(tree, mask));
        } else {
          results.push(tree);
        }
      }
    } // check sub tree as well


    treeKeys.forEach(function (item) {
      if (_typeof(tree[item]) === 'object') _parseMask(tree[item], mask, trim, results);
    });
  }

  return results;
};

var _trim = function _trim(tree, mask) {
  if (_typeof(tree) === 'object') {
    var obj = {};

    for (var key in mask) {
      var v = tree[key];
      obj[key] = _typeof(tree) === "object" ? _trim(tree[key], mask[key], obj) : v;
    }

    return obj;
  }

  return tree;
};

module.exports = {
  match: match
};