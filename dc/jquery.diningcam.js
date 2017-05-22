/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
  jQuery [name] plugin
  @name jquery.diningcam.js
  @author Gary Scott
  @version 0.1-beta
  @date 05/21/2017
  @category jQuery Plugin
  @copyright (c) UC Regents
*/

;
(function ($) {
  'use strict';

  var diningCommons = {
    carrillo: 'Carrillo',
    dlg: 'De La Guerra',
    ortega: 'Ortega'
  };

  var baseApiUrl = 'https://appl.housing.ucsb.edu/api/dining/cam/';

  $.fn.diningcam = function (options) {
    // Options
    var settings = $.extend({}, $.fn.diningcam.defaults, options);

    // Logic
    return this.each(function () {

      var state = {};
      // Load parameters
      state.diningCommonName = getDcName($(this));

      if (state.diningCommonName !== undefined) {

        state.diningCommonSlug = getDcSlug($(this));
        state.timeout = getTimeout($(this), settings.timeout);
        state.streamApiUrl = baseApiUrl + state.diningCommonSlug + '';
        state.staticApiUrl = baseApiUrl + state.diningCommonSlug + '/snapshot';

        // Go
        $(this).addClass('jq-diningcam');
        $(this).append('<img src="' + state.streamApiUrl + '">');
        $(this).append('<span>' + state.diningCommonName + '</span>');
        $(this).append('<i class="fa fa-play" style="display: none;"></i>');
        $(this).append('<i class="fa fa-pause"></i>');

        start(state, $(this));

        // Add Events.
        $(this).on('click touchend', function () {

          if (state.isPlaying) {
            stop(state, $(this));
          } else {
            start(state, $(this));
          }
        }); // end click
      } else {
        // Error
        $(this).html(getLoadError(diningCommonSlug));
      }
    }); // end return
  }; // end Logic

  // Default Options
  $.fn.diningcam.defaults = {
    timeout: 30
  }; // end defaults

  function getDcSlug(obj) {
    return obj.data('dining-common');
  }

  function getDcName(obj) {
    return diningCommons[obj.data('dining-common')];
  }

  function getTimeout(obj, defaultTimeout) {
    return $.isNumeric(obj.data('timeout')) ? obj.data('timeout') : defaultTimeout;
  }

  function getLoadError(diningCommonSlug) {
    return 'Error: unable to load ' + diningCommonSlug + '. Must be one of [' + Object.keys(diningCommons) + '].';
  }

  function getUrl(playing, streamApiUrl, staticApiUrl) {
    return playing ? streamApiUrl : staticApiUrl + '?=' + new Date().getTime();
  }

  function setUI(state, obj) {
    obj.find('img').attr('src', getUrl(state.isPlaying, state.streamApiUrl, state.staticApiUrl));
    obj.find('.fa-play').toggle(!state.isPlaying);
    obj.find('.fa-pause').toggle(state.isPlaying);
  }

  function stop(state, obj) {
    state.isPlaying = false;
    setUI(state, obj);
  }

  function start(state, obj) {
    state.isPlaying = true;
    setUI(state, obj);
    startTimer(state, obj);
  }

  function startTimer(state, obj) {
    setTimeout(function () {
      stop(state, obj);
    }, 1000 * state.timeout);
  }
})(jQuery);

/***/ })
/******/ ]);