"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash.debounce"));
var _material = require("@mui/material");
var _useQuery3 = _interopRequireDefault(require("../../hooks/useQuery"));
var _DebounceSelectModule = _interopRequireDefault(require("./styles/DebounceSelect.module.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * A debounce input select API function that returns a component with an input box and a dynamic dropdown menu that is populated with data retrieved from a specified API endpoint when an input value is selected.
 *
 * @param {Function} onchange - A function to be called when the selected input value changes.
 * @param {Function} apiFunc - The API function to call when an input value is selected.
 * @param {string} [url_prefix] - The prefix for the API endpoint URL with "deb_select" as default value
 * @param {string} placeholder - The placeholder text to display in the input select field.
 * @param {string} optionkey - The key in the API response JSON object to be used as the option label.
 * @param {string} optionValue - The key in the API response JSON object to be used as the option value.
 *
 * @returns {React.Component} A React component with an input box and a dropdown menu that is populated with data retrieved from the specified API endpoint.
 */

var DebounceSelect = function DebounceSelect(_ref) {
  var onchange = _ref.onchange,
    apiFunc = _ref.apiFunc,
    _ref$url_prefix = _ref.url_prefix,
    url_prefix = _ref$url_prefix === void 0 ? "deb_select" : _ref$url_prefix,
    placeholder = _ref.placeholder,
    optionkey = _ref.optionkey,
    optionValue = _ref.optionValue;
  var rootRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    searchText = _useState2[0],
    setSearchText = _useState2[1];
  var _useQuery = (0, _useQuery3["default"])(),
    _useQuery2 = _slicedToArray(_useQuery, 2),
    query = _useQuery2[0],
    setQuery = _useQuery2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    isIntLoading = _useState6[0],
    setIntLoading = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isDropDownVisible = _useState8[0],
    setIsDropDownVisible = _useState8[1];
  var _useState9 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    suggestions = _useState10[0],
    setSuggestions = _useState10[1];
  var _useState11 = (0, _react.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    selectedKey = _useState12[0],
    setSelectedKey = _useState12[1];
  var urlPrefixSelected = "".concat(url_prefix, "_grade");
  var rootClassName = "".concat(url_prefix, "_select_deb_root");
  (0, _react.useEffect)(function () {
    var isMounted = true;
    apiFunc(searchText).then(function (data) {
      return setSuggestions(data);
    }).then(function () {
      if (isMounted) {
        setIntLoading(false);
        setIsLoading(false);
      }
    });
    return function () {
      isMounted = false;
    };
  }, []);
  var handleWindowClick = (0, _react.useCallback)(function (event) {
    if (!event.target.closest("." + rootClassName)) {
      setIsDropDownVisible(false);
    }
  }, []);
  (0, _react.useEffect)(function () {
    window.addEventListener("click", handleWindowClick);
    return function () {
      return window.removeEventListener("click", handleWindowClick);
    };
  }, []);
  (0, _react.useEffect)(function () {
    var toMatch = query[urlPrefixSelected];
    // console.log('urlPrefixSelected', toMatch);
    if (!isIntLoading && toMatch) {
      var suggestion = suggestions.find(function (data, index) {
        return optionkey ? data[optionkey] == toMatch : index == toMatch;
      });
      if (suggestion) {
        setSelectedKey(toMatch);
        setSearchText(optionValue && suggestion[optionValue] || suggestion);
      }
    }
  }, [isIntLoading, query[urlPrefixSelected]]);
  var handleDebounceFn = function handleDebounceFn(keyword) {
    apiFunc(keyword).then(function (data) {
      return setSuggestions(data);
    });
    setIsLoading(false);
  };
  var debounceFn = (0, _react.useCallback)((0, _lodash["default"])(handleDebounceFn, 1000), []);
  function handleInputChange(event) {
    setIsLoading(true);
    setSearchText(event.target.value);
    setQuery(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, urlPrefixSelected, "")));
    setSelectedKey(null);
    debounceFn(event.target.value);
    onchange === null || onchange === void 0 ? void 0 : onchange(null);
  }
  var handleSuggestionClick = function handleSuggestionClick(suggestion, index) {
    var selectedItem = optionkey ? suggestion[optionkey] : index;
    if (selectedItem === selectedKey) {
      setQuery(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, urlPrefixSelected, "")));
      setSelectedKey(null);
      setSearchText("");
      onchange === null || onchange === void 0 ? void 0 : onchange(null);
    } else {
      setSelectedKey(selectedItem);
      setSearchText(optionValue && suggestion[optionValue] || suggestion);
      setQuery(_objectSpread(_objectSpread({}, query), {}, _defineProperty({}, urlPrefixSelected, selectedItem)));
      onchange === null || onchange === void 0 ? void 0 : onchange(suggestion);
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: rootRef,
    className: "".concat(_DebounceSelectModule["default"].autocomplete, " ").concat(rootClassName)
  }, /*#__PURE__*/_react["default"].createElement("label", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: searchText,
    onFocus: function onFocus() {
      setIsDropDownVisible(true);
    },
    onChange: handleInputChange
    // onBlur={() => {
    //   setTimeout(() => setIsDropDownVisible(false), 300);
    // }}
    ,
    placeholder: placeholder
  })), isDropDownVisible ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _DebounceSelectModule["default"].suggestionsOverlay
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _DebounceSelectModule["default"].suggestionBody
  }, isLoading && /*#__PURE__*/_react["default"].createElement("div", {
    className: _DebounceSelectModule["default"].loading
  }, /*#__PURE__*/_react["default"].createElement(_material.CircularProgress, null)), searchText && !isLoading && suggestions.length == 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: _DebounceSelectModule["default"].noData
  }, "No result found!"), /*#__PURE__*/_react["default"].createElement("div", {
    className: _DebounceSelectModule["default"].result
  }, suggestions.map(function (suggestion, index) {
    var isSelected = optionkey ? suggestion[optionkey] == selectedKey : index === selectedKey;
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      onClick: function onClick() {
        return handleSuggestionClick(suggestion, index);
      },
      className: "".concat(_DebounceSelectModule["default"].item, " ").concat(isSelected && _DebounceSelectModule["default"].suggestionActive || "")
    }, /*#__PURE__*/_react["default"].createElement("span", null, optionValue && suggestion[optionValue] || suggestion), isSelected && /*#__PURE__*/_react["default"].createElement("i", {
      className: "ri-check-line",
      style: {
        marginLeft: "8px"
      }
    }));
  })))) : null);
};
var _default = DebounceSelect;
exports["default"] = _default;