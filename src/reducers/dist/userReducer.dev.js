"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userReducer = exports.intialState = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var intialState = null;
exports.intialState = intialState;

var userReducer = function userReducer(state, action) {
  if (action.type === "USER") {
    return action.payload;
  } // if(action.type==="comment"){
  //     return action.payload
  // }


  if (action.type === "CLEAR") {
    return null;
  }

  if (action.type === "UPDATED") {
    console.log("check state", state);
    return _objectSpread({}, state, {
      followers: action.payload.followers,
      following: action.payload.following
    });
  }

  if (action.type === "UPDATEPIC") {
    return _objectSpread({}, state, {
      picture: action.payload
    });
  }

  return state;
};

exports.userReducer = userReducer;