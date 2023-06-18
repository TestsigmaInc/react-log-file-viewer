"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _webWorkerUtils = require("../utils/webWorkerUtils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var ReactLogFileViewer = function ReactLogFileViewer(_ref) {
  var filePath = _ref.filePath,
    _ref$itemSize = _ref.itemSize,
    itemSize = _ref$itemSize === void 0 ? 40 : _ref$itemSize,
    _ref$lineHeight = _ref.lineHeight,
    lineHeight = _ref$lineHeight === void 0 ? 20 : _ref$lineHeight,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? '800px' : _ref$width;
  var containerRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    lines = _useState2[0],
    setLines = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    startIndex = _useState4[0],
    setStartIndex = _useState4[1];
  var _useState5 = (0, _react.useState)(itemSize),
    _useState6 = _slicedToArray(_useState5, 2),
    endIndex = _useState6[0],
    setEndIndex = _useState6[1];
  (0, _react.useEffect)(function () {
    var workerInstance = (0, _webWorkerUtils.createWorker)();
    workerInstance.onmessage = function (event) {
      var data = event.data;
      setLines(data);
    };
    workerInstance.postMessage({
      filePath: filePath
    });
    return function () {
      workerInstance.terminate();
    };
  }, [filePath]);
  (0, _react.useEffect)(function () {
    var container = containerRef.current;
    var handleScroll = function handleScroll() {
      var scrollTop = container.scrollTop;
      var clientHeight = container.clientHeight;
      var currentStartIndex = Math.floor(scrollTop / lineHeight);
      var currentEndIndex = Math.ceil((scrollTop + clientHeight) / lineHeight);
      if (currentStartIndex !== startIndex || currentEndIndex !== endIndex) {
        setStartIndex(currentStartIndex);
        setEndIndex(currentEndIndex);
      }
    };
    container.addEventListener('scroll', handleScroll);
    return function () {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [startIndex, endIndex, lineHeight]);
  var visibleLines = lines.slice(startIndex, endIndex);
  var calculateContainerHeight = function calculateContainerHeight() {
    var visibleLinesCount = Math.min(visibleLines.length, itemSize);
    var minHeight = itemSize * lineHeight;
    return "".concat(Math.max(visibleLinesCount * lineHeight, minHeight), "px");
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: containerRef,
    style: {
      height: calculateContainerHeight(),
      width: width,
      overflow: 'auto',
      padding: '10px 20px',
      border: '1px solid gray',
      margin: '20px auto'
    }
  }, lines.length > 0 ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      height: "".concat(startIndex * lineHeight, "px")
    }
  }), visibleLines.map(function (line, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: startIndex + index,
      style: {
        height: "".concat(lineHeight, "px")
      }
    }, line);
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      height: "".concat((lines.length - endIndex) * lineHeight, "px")
    }
  })) : /*#__PURE__*/_react["default"].createElement("div", null, "Loading..."));
};
var _default = ReactLogFileViewer;
exports["default"] = _default;