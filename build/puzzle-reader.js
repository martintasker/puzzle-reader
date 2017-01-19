(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("marked"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["marked", "react"], factory);
	else if(typeof exports === 'object')
		exports["PuzzleReader"] = factory(require("marked"), require("react"));
	else
		root["PuzzleReader"] = factory(root["marked"], root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _marked = __webpack_require__(1);
	
	var _marked2 = _interopRequireDefault(_marked);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var reader = function () {
	  function reader(mdString) {
	    _classCallCheck(this, reader);
	
	    this.mdString = mdString;
	    var htmlString = (0, _marked2.default)(mdString);
	    var h1Sections = this._geth1Sections(htmlString);
	    this.rubric = h1Sections.rubric.join('');
	    var puzzleSections = this._getPuzzleSections(h1Sections.puzzle);
	
	    var _extractPuns2 = this._extractPuns(puzzleSections),
	        puns = _extractPuns2.puns,
	        cleanParas = _extractPuns2.cleanParas;
	
	    this.puzzle = { puns: puns, text: cleanParas };
	  }
	
	  _createClass(reader, [{
	    key: '_geth1Sections',
	    value: function _geth1Sections(htmlString) {
	      var lines = htmlString.split('\n');
	      var output = { rubric: [], puzzle: [] };
	      var outLabel = "";
	      lines.forEach(function (line) {
	        if (!line) {
	          return;
	        }
	        var h1Label = function (line) {
	          var rx = /<h1 id=\"(.*)?\".*<\/h1>/;
	          var matches = line.match(rx);
	          if (!matches) {
	            return "";
	          }
	          return matches[1];
	        }(line);
	        if (h1Label) {
	          outLabel = h1Label;
	          output[outLabel] = output[outLabel] || [];
	          return;
	        }
	        if (outLabel) {
	          output[outLabel].push(line);
	        }
	      });
	      return output;
	    }
	  }, {
	    key: '_getPuzzleSections',
	    value: function _getPuzzleSections(puzzleHTML) {
	      var html = puzzleHTML.join(' ');
	      var sections = html.split(/<h2.*section<\/h2>/);
	      var paraSections = sections.map(function (section) {
	        return section.split(/<\/?p>/).filter(function (line) {
	          return line !== "" && line !== " ";
	        });
	      });
	      var res = [];
	      for (var i = 0; i < sections.length; ++i) {
	        if (i > 0) {
	          res.push("br");
	        }
	        paraSections[i].forEach(function (para) {
	          res.push({ p: para });
	        });
	      }
	      return res;
	    }
	  }, {
	    key: '_extractPuns',
	    value: function _extractPuns(paras) {
	      var puns = [];
	      var cleanParas = paras.map(function (para) {
	        if (typeof para === 'string') {
	          return para;
	        }
	        var rx = /<strong>(.*?)<\/strong>/g;
	        var text = para.p;
	        var matches = text.match(rx);
	        if (!matches) {
	          return { p: [text] };
	        }
	        var res = [];
	        var spans = text.split(/<strong>.*?<\/strong>/);
	        for (var i = 0; i < spans.length; i++) {
	          if (i > 0) {
	            puns.push(function (tag) {
	              return tag.match(/<strong>(.*)<\/strong>/)[1];
	            }(matches[i - 1]));
	            res.push({ pun: puns.length - 1 });
	          }
	          if (!!spans[i]) {
	            res.push(spans[i]);
	          }
	        }
	        return { p: res };
	      });
	      return { puns: puns, cleanParas: cleanParas };
	    }
	  }, {
	    key: 'getRubric',
	    value: function getRubric() {
	      return this.rubric;
	    }
	  }, {
	    key: 'getPuzzle',
	    value: function getPuzzle() {
	      return this.puzzle;
	    }
	  }]);
	
	  return reader;
	}();
	
	var render = function render(puzzle, punElement) {
	
	  return _react2.default.createElement('div', null, puzzle.text.map(mapLine));
	
	  function mapLine(line, i) {
	    if (typeof line === 'string') {
	      return _react2.default.createElement('br', { key: i });
	    }
	    var text = line.p;
	    if (!text) {
	      return null;
	    }
	    return _react2.default.createElement('p', { key: i }, text.map(mapSpan));
	  }
	
	  function mapSpan(span, i) {
	    if (typeof span === 'string') {
	      return _react2.default.createElement('span', { key: i }, [span]);
	    }
	    return _react2.default.createElement(punElement, { key: i, pun: puzzle.puns[span.pun] });
	  }
	};
	
	exports.default = { reader: reader, render: render };

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=puzzle-reader.js.map