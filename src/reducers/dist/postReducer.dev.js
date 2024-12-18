"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postReducer = exports.initialvalue = void 0;
var initialvalue = null;
exports.initialvalue = initialvalue;

var postReducer = function postReducer(value, action) {
  if (action.type === "comment") {
    return action.payload;
  }

  if (action.type === "comments") {
    return action.payload;
  }

  if (action.type === "commented") {
    return action.payload;
  }

  return value;
};

exports.postReducer = postReducer;