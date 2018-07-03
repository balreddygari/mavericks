/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(41);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _assign = __webpack_require__(2);

	var _assign2 = _interopRequireDefault(_assign);

	var _isArray = __webpack_require__(38);

	var _isArray2 = _interopRequireDefault(_isArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function monkeyPatch(obj, field, value) {
	    if (typeof obj[field] === 'undefined') {
	        obj[field] = value;
	    }
	}

	monkeyPatch(Object, 'assign', _assign2.default);
	monkeyPatch(Array, 'isArray', _isArray2.default);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(6).Object.assign;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(4);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(19)});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , core      = __webpack_require__(6)
	  , ctx       = __webpack_require__(7)
	  , hide      = __webpack_require__(9)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(8);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(10)
	  , createDesc = __webpack_require__(18);
	module.exports = __webpack_require__(14) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(11)
	  , IE8_DOM_DEFINE = __webpack_require__(13)
	  , toPrimitive    = __webpack_require__(17)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(14) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(14) && !__webpack_require__(15)(function(){
	  return Object.defineProperty(__webpack_require__(16)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(15)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12)
	  , document = __webpack_require__(5).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(12);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(20)
	  , gOPS     = __webpack_require__(35)
	  , pIE      = __webpack_require__(36)
	  , toObject = __webpack_require__(37)
	  , IObject  = __webpack_require__(24)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(15)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(21)
	  , enumBugKeys = __webpack_require__(34);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(22)
	  , toIObject    = __webpack_require__(23)
	  , arrayIndexOf = __webpack_require__(27)(false)
	  , IE_PROTO     = __webpack_require__(31)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(24)
	  , defined = __webpack_require__(26);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(25);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(23)
	  , toLength  = __webpack_require__(28)
	  , toIndex   = __webpack_require__(30);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(29)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(29)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(32)('keys')
	  , uid    = __webpack_require__(33);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(26);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	module.exports = __webpack_require__(6).Array.isArray;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(4);

	$export($export.S, 'Array', {isArray: __webpack_require__(40)});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(25);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _constants = __webpack_require__(42);

	var _constants2 = _interopRequireDefault(_constants);

	var _Dispatcher = __webpack_require__(43);

	var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

	var _Cache = __webpack_require__(77);

	var _Cache2 = _interopRequireDefault(_Cache);

	var _RecoveryHandler = __webpack_require__(78);

	var _RecoveryHandler2 = _interopRequireDefault(_RecoveryHandler);

	var _ApiHandler = __webpack_require__(79);

	var _ApiHandler2 = _interopRequireDefault(_ApiHandler);

	var _PageHandler = __webpack_require__(80);

	var _PageHandler2 = _interopRequireDefault(_PageHandler);

	var _EventQueue = __webpack_require__(81);

	var _EventQueue2 = _interopRequireDefault(_EventQueue);

	var _SessionHandler = __webpack_require__(83);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SWACore = function () {
	    function SWACore(options) {
	        _classCallCheck(this, SWACore);

	        if (!SWACore.isLocalStorageAvailable()) {
	            /* Stop SWA from running if there is no localStorage
	             * (happens in Safari Private Browsing Session)
	             * will try to fix this in the future.
	             * */
	            return;
	        }
	        this.handlers = {};
	        this._options = {};
	        this.updateOptions(_constants2.default);
	        this._options.updateOptions = this.updateOptions.bind(this);
	        this._options.log = this.log.bind(this);
	        this.updateOptions(options);
	        this.registerHandler('SessionHandler', _SessionHandler.SessionHandler);
	        this.registerHandler('RecoveryHandler', _RecoveryHandler2.default);
	        this.registerHandler('ApiHandler', _ApiHandler2.default);
	        this.registerHandler('PageHandler', _PageHandler2.default);

	        this._options.cache = this._options.cache || new _Cache2.default(this._options);
	        this._options.dispatcher = this._options.dispatcher || new _Dispatcher2.default(this._options);
	        this._options.eventQueue = this._options.eventQueue || new _EventQueue2.default(this._options, this._options.dispatcher);
	        this._options.factory = this._options.eventQueue.factory;
	        this.loadHandlers();
	    }

	    _createClass(SWACore, [{
	        key: 'updateOptions',
	        value: function updateOptions(options) {
	            var _this = this;

	            // Overrides/extends default options.
	            // Only certain options are available to override.

	            ['bundleDataFunction', 'eventRecovery', 'cache', 'cacheKey', 'deploymentID', 'dispatcher', 'eventParser', 'eventQueue', 'factory', 'maxQueueSize', 'mintUuid', 'log', 'logging', 'queueFailureMax', 'experienceIDKey', 'updateOptions', 'userID', 'cookieRegex', 'experienceID', 'savedTokenKey', 'url', 'version', 'visibility', 'instanceGUID', 'cookieExperienceIDRegex', 'cookieSavedTokenKeyRegex', 'cookieCSRFRegex'].forEach(function (key) {
	                if (typeof options[key] !== 'undefined') {
	                    _this._options[key] = options[key];
	                }
	            });
	            Object.keys(options.handlers || {}).forEach(function (key) {
	                _this.registerHandler(key, options.handlers[key]);
	            });
	        }
	    }, {
	        key: 'registerHandler',
	        value: function registerHandler(name, handler) {
	            this.handlers[name] = {
	                handler: handler
	            };
	            if (handler.init) {
	                handler.init(this._options);
	            }
	        }
	    }, {
	        key: 'loadHandlers',
	        value: function loadHandlers() {
	            var _this2 = this;

	            Object.keys(this.handlers).forEach(function (key) {
	                var handler = _this2.handlers[key];
	                if (!handler.loaded) {
	                    try {
	                        handler.handler(_this2._options.factory, _this2._options);
	                    } finally {
	                        handler.loaded = true;
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'log',
	        value: function log() {
	            if (this._options.devMode || this._options.logging) {
	                var _window$console;

	                (_window$console = window.console).log.apply(_window$console, arguments);
	            }
	        }
	    }, {
	        key: 'getOption',
	        value: function getOption(key) {
	            return this._options[key];
	        }
	    }], [{
	        key: 'isLocalStorageAvailable',
	        value: function isLocalStorageAvailable() {
	            try {
	                localStorage.setItem('is', 'available');
	            } catch (e) {
	                return false;
	            }
	            return true;
	        }
	    }]);

	    return SWACore;
	}();

	exports.default = SWACore;


	window.SWA = window.SWA || SWACore;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var constants = {};

	/**
	 * GENERAL SWA SETTINGS
	 * */
	constants.CACHE_NAME = 'mintjs:cache';

	constants.MAX_QUEUE_SIZE = 10;

	constants.MINT_UUID = '123';

	constants.COOKIE_CSRF_REGEX = /splunkweb_csrf_token_[0-9]+=([^;]*)/;

	// Key to save experience id in cookie
	constants.EXPERIENCE_ID_KEY = 'experience_id';

	constants.COOKIE_EXPERIENCE_ID_REGEX = /experience_id=([^;]*)/;

	// Key to save CSRF token in cookie as future references
	constants.SAVED_TOKEN_KEY = 'token_key';

	constants.COOKIE_SAVED_TOKEN_KEY_REGEX = /token_key=([^;]*)/;

	// Can't rely on $C existing if we're loaded in a 3rd-party
	// page (perhaps served by a custom controller), so check first.
	constants.LOCALE = window.$C && window.$C.LOCALE;

	// If we can't find the locale, we're in a strange place.
	// We'll use this to skip certain logic that requires a familiar
	// page context as usually provided by splunkweb.
	constants.FOREIGN_PAGE_CONTEXT = !constants.LOCALE;

	// Capture Groups: 1 = app name, 2 = page string
	// Page string will exclude any ?query=params or #anchors from the URL
	constants.APP_PAGE_DATA_REGEXP = new RegExp(constants.LOCALE + '/app/([^#?/]+)/([^#?]*)');

	// Capture Groups: 1 = page string - which is the location string
	constants.HELP_PAGE_DATA_REGEXP = new RegExp(constants.LOCALE + '/help\\?(?:.+&)?location=([^&]*)');

	// Capture Groups: 1 = page string
	// System pages are all those not under the /help/ or /app/ namespaces
	constants.SYSTEM_PAGE_DATA_REGEXP = new RegExp(constants.LOCALE + '/([^#?]*)');

	constants.SYSTEM_APP_NAME = '$SPLUNK_PLATFORM';

	// Capture Groups: 1 = page string prefix, 2 = username, 3 = page string suffix
	// Capture group 2 should be excluded if this regexp matches a URL to be reported.
	// If editing, be mindful the capture group protocol listed above.
	//  - You can use (?:non-capturing-groups) to group without capturing,
	//    and thus avoid affecting the protocol.
	constants.USERNAME_OBSCURE_REGEXP = new RegExp(
	// Match the locale segment
	constants.LOCALE + '/' +

	// Match group #1 - the page string preceding the username
	'(manager/[^/]+/authentication/(?:users|changepassword)/)' +

	// Match group #2 - the username segment
	'([^/#?]+)' +

	// Match group #3 - the rest of the page string excluding any query params or anchors.
	// Should match the empty string in case of no trailing segment
	'(/?[^#?]*)');

	/**
	 * DEV MODE OPTIONS
	 * */

	/**
	 * Enables dev mode.
	 */
	constants.DEV_MODE = false;

	/**
	 * Enables logging
	 * @type {boolean}
	 */
	constants.ENABLE_LOGGING = false;

	/**
	 * Logs event sending on dev mode.
	 * @constructor
	 */
	constants.LOG = function () {
	  if (constants.DEV_MODE || constants.ENABLE_LOGGING) {
	    var _window;

	    (_window = window).console.apply(_window, arguments);
	  }
	};

	/**
	/* HELPER FUNCTIONS
	/**
	/**
	 * Define a function that returns stringified data.
	 * (events) => {
	 *     return events.toString();
	 * }
	 *
	 * Set to 'CDS' to use internal function to bundle data for CDS. Default.
	 * Set to null to use basic stringify.
	 *
	 * @param events
	 * @returns {string|*}
	 * @constructor
	 */
	constants.BUNDLE_DATA_FUNCTION = 'CDS';

	/**
	 * Parses a JSON string to an Event.
	 * @param key
	 * @param val
	 * @returns {*}
	 * @constructor
	 */

	/* constants.EVENT_PARSER = (key, val) => {
	    if (typeof(val) === 'object' && val.__type == "Event") {
	        return new Event(val);
	    }
	    return val;
	   }  */
	/**
	 * EXPORT
	 * */
	exports.default = {
	  cacheKey: 'swa_js_recovery',
	  queueFailureMax: 200,
	  baseURL: constants.BASE_URL,
	  bundleDataFunction: constants.BUNDLE_DATA_FUNCTION,
	  devMode: constants.DEV_MODE,
	  devURL: constants.DEV_URL, // Set null to not send data
	  log: constants.LOG,
	  logging: constants.ENABLE_LOGGING,
	  maxQueueSize: constants.MAX_QUEUE_SIZE,
	  mintUuid: constants.MINT_UUID,
	  experienceIDKey: constants.EXPERIENCE_ID_KEY,
	  cookieCSRFRegex: constants.COOKIE_CSRF_REGEX,
	  cookieExperienceIDRegex: constants.COOKIE_EXPERIENCE_ID_REGEX,
	  cookieSavedTokenKeyRegex: constants.COOKIE_SAVED_TOKEN_KEY_REGEX,
	  savedTokenKey: constants.SAVED_TOKEN_KEY,

	  LOCALE: constants.LOCALE,
	  FOREIGN_PAGE_CONTEXT: constants.FOREIGN_PAGE_CONTEXT,
	  APP_PAGE_DATA_REGEXP: constants.APP_PAGE_DATA_REGEXP,
	  HELP_PAGE_DATA_REGEXP: constants.HELP_PAGE_DATA_REGEXP,
	  SYSTEM_PAGE_DATA_REGEXP: constants.SYSTEM_PAGE_DATA_REGEXP,
	  USERNAME_OBSCURE_REGEXP: constants.USERNAME_OBSCURE_REGEXP,
	  SYSTEM_APP_NAME: constants.SYSTEM_APP_NAME
	};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var API_VERSION = '1.0';

	var Dispatcher = function () {
	    /** **************************************************************************************
	     * PUBLIC API                                                                            *
	     ****************************************************************************************
	     * */
	    /**
	     * @param options - Pass in SWACore options to construct dispatcher
	     */
	    function Dispatcher(options) {
	        _classCallCheck(this, Dispatcher);

	        this._options = options;
	    }

	    /**
	     * Send data to CDS
	     *
	     * @param {Event[]} events - Array of Events to send
	     * @param {boolean} final - Sends all data
	     * @returns {Promise} Data sent or error
	     */


	    _createClass(Dispatcher, [{
	        key: 'sendData',
	        value: function sendData() {
	            var _this = this;

	            var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];
	            var final = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            var url = this._buildURL(events);
	            var data = this.bundleData(events);
	            this._options.log('Sending Data:', data);

	            return new Promise(function (resolve, reject) {
	                if (url && data) {
	                    var onFail = function onFail(status, text) {
	                        reject({
	                            status: status,
	                            statusText: text,
	                            events: events
	                        });
	                    };
	                    if (final && navigator.sendBeacon) {
	                        // Uses sendBeacon because asynchronous POST will not work for window.unload.
	                        var blob = new Blob([data], {
	                            type: 'application/json'
	                        });
	                        if (navigator.sendBeacon(url, blob)) {
	                            resolve({
	                                response: 'success',
	                                data: data
	                            });
	                        } else {
	                            onFail(400, 'Error sending events.');
	                        }
	                    } else {
	                        var xhr = new XMLHttpRequest();
	                        var headers = _this._buildHeaders();

	                        xhr.open('post', url);
	                        xhr.onload = function onload() {
	                            if (this.status >= 200 && this.status < 300) {
	                                resolve({
	                                    response: xhr.response,
	                                    data: data
	                                });
	                            } else {
	                                onFail(this.status, xhr.statusText);
	                            }
	                        };
	                        xhr.onerror = function onerror() {
	                            onFail(this.status, xhr.statusText);
	                        };
	                        if (headers) {
	                            Object.keys(headers).forEach(function (key) {
	                                xhr.setRequestHeader(key, headers[key]);
	                            });
	                        }
	                        try {
	                            xhr.send(data);
	                        } catch (e) {
	                            onFail(0, e);
	                        }
	                    }
	                } else {
	                    var message = 'No Data Sent: URL not set.';
	                    reject(new Error(message));
	                }
	            });
	        }

	        /**
	         * Formats data into JSON to be sent.
	         * @param {Event[]} events - Array of Events to send
	         * @returns {string|*} - JSON string of data.
	         */

	    }, {
	        key: 'bundleData',
	        value: function bundleData() {
	            var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];

	            var bundleDataFunction = this._options.bundleDataFunction || 'json';
	            if (bundleDataFunction instanceof Function) {
	                return bundleDataFunction(events);
	            } else if (bundleDataFunction === 'CDS') {
	                return this._formatDataForCDS(events);
	            } else if (bundleDataFunction === 'json') {
	                return Dispatcher._formatDataForEndpoint(events);
	            }
	            return JSON.stringify(events);
	        }

	        /**
	         * @returns {string} The API version.
	         */

	    }, {
	        key: '_buildURL',


	        /** ******************************************************************************************
	         * PRIVATE FUNCTIONS                                                                         *
	         *******************************************************************************************
	         * */
	        /**
	         * Builds URL according to CDS specs
	         * @param {object} events
	         * @returns {string} The URL
	         * @private
	         */
	        value: function _buildURL(events) {
	            var baseURL = this._options.url;

	            if (baseURL && events && baseURL.indexOf('splkmobile') > -1) {
	                var errorCount = 0;
	                var eventCount = 0;

	                (events || []).forEach(function (event) {
	                    if (event.stacktrace || event.errorHash || event.klass) {
	                        errorCount += 1;
	                    } else {
	                        eventCount += 1;
	                    }
	                });
	                baseURL = [baseURL, this._options.MintUUID, errorCount, eventCount].join('/');
	            }
	            return baseURL;
	        }

	        /**
	         * Builds the headers to send to CDS
	         * @param {boolean} sendToHEC
	         * @returns {Object} Headers
	         * @private
	         */

	    }, {
	        key: '_buildHeaders',
	        value: function _buildHeaders() {
	            var sendToHEC = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._options.sendToHEC;

	            var headers = {};

	            // Setting different headers
	            if (sendToHEC) {
	                headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	                headers.Authorization = 'Splunk '.concat(this._options.token);
	            } else {
	                headers['Content-Type'] = 'application/json;charset=UTF-8';
	                headers['X-Splunk-Mint-Send-CORS'] = true;
	            }
	            return headers;
	        }

	        /**
	         * Formats data to be sent to Internal Rest Endpoint
	         * @param events
	         * @returns {object}
	         * @private
	         */

	    }, {
	        key: '_formatDataForCDS',


	        /**
	         * Formats data to be sent to CDS
	         * @param events
	         * @returns {string|*}
	         * @private
	         */
	        value: function _formatDataForCDS(events) {
	            var _this2 = this;

	            return events.map(function (event) {
	                var result = event.toPayload();
	                result.version = _this2._options.version;
	                var root = {
	                    sdkVersion: '4.3',
	                    osVersion: '0',
	                    event_name: 'Deployment',
	                    appVersionCode: '3',
	                    uuid: _this2._options.deploymentID,
	                    packageName: 'splunk_instrumentation',
	                    extraData: result,
	                    session_id: result.experienceID,
	                    appVersionName: '1'
	                };
	                return JSON.stringify(root) + ['{', parseInt(Dispatcher.getApiVersion(), 10), 'event', event.timestamp].join('^') + '}';
	            }).join('');
	        }
	    }], [{
	        key: 'getApiVersion',
	        value: function getApiVersion() {
	            return API_VERSION;
	        }
	    }, {
	        key: '_formatDataForEndpoint',
	        value: function _formatDataForEndpoint(events) {
	            return JSON.stringify(events.map(function (event) {
	                return event.toPayload();
	            }));
	        }
	    }]);

	    return Dispatcher;
	}();

	exports.default = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(45);
	__webpack_require__(46);
	__webpack_require__(59);
	__webpack_require__(63);
	module.exports = __webpack_require__(6).Promise;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(47)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(48)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(29)
	  , defined   = __webpack_require__(26);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(49)
	  , $export        = __webpack_require__(4)
	  , redefine       = __webpack_require__(50)
	  , hide           = __webpack_require__(9)
	  , has            = __webpack_require__(22)
	  , Iterators      = __webpack_require__(51)
	  , $iterCreate    = __webpack_require__(52)
	  , setToStringTag = __webpack_require__(56)
	  , getPrototypeOf = __webpack_require__(58)
	  , ITERATOR       = __webpack_require__(57)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	module.exports = true;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	module.exports = {};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(53)
	  , descriptor     = __webpack_require__(18)
	  , setToStringTag = __webpack_require__(56)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(9)(IteratorPrototype, __webpack_require__(57)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(11)
	  , dPs         = __webpack_require__(54)
	  , enumBugKeys = __webpack_require__(34)
	  , IE_PROTO    = __webpack_require__(31)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(16)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(55).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(10)
	  , anObject = __webpack_require__(11)
	  , getKeys  = __webpack_require__(20);

	module.exports = __webpack_require__(14) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5).document && document.documentElement;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(10).f
	  , has = __webpack_require__(22)
	  , TAG = __webpack_require__(57)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(32)('wks')
	  , uid        = __webpack_require__(33)
	  , Symbol     = __webpack_require__(5).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(22)
	  , toObject    = __webpack_require__(37)
	  , IE_PROTO    = __webpack_require__(31)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	var global        = __webpack_require__(5)
	  , hide          = __webpack_require__(9)
	  , Iterators     = __webpack_require__(51)
	  , TO_STRING_TAG = __webpack_require__(57)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(61)
	  , step             = __webpack_require__(62)
	  , Iterators        = __webpack_require__(51)
	  , toIObject        = __webpack_require__(23);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(48)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(49)
	  , global             = __webpack_require__(5)
	  , ctx                = __webpack_require__(7)
	  , classof            = __webpack_require__(64)
	  , $export            = __webpack_require__(4)
	  , isObject           = __webpack_require__(12)
	  , aFunction          = __webpack_require__(8)
	  , anInstance         = __webpack_require__(65)
	  , forOf              = __webpack_require__(66)
	  , speciesConstructor = __webpack_require__(70)
	  , task               = __webpack_require__(71).set
	  , microtask          = __webpack_require__(73)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(57)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(74)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(56)($Promise, PROMISE);
	__webpack_require__(75)(PROMISE);
	Wrapper = __webpack_require__(6)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(76)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(25)
	  , TAG = __webpack_require__(57)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(7)
	  , call        = __webpack_require__(67)
	  , isArrayIter = __webpack_require__(68)
	  , anObject    = __webpack_require__(11)
	  , toLength    = __webpack_require__(28)
	  , getIterFn   = __webpack_require__(69)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(11);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(51)
	  , ITERATOR   = __webpack_require__(57)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(64)
	  , ITERATOR  = __webpack_require__(57)('iterator')
	  , Iterators = __webpack_require__(51);
	module.exports = __webpack_require__(6).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(11)
	  , aFunction = __webpack_require__(8)
	  , SPECIES   = __webpack_require__(57)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(7)
	  , invoke             = __webpack_require__(72)
	  , html               = __webpack_require__(55)
	  , cel                = __webpack_require__(16)
	  , global             = __webpack_require__(5)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(25)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ }),
/* 72 */
/***/ (function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , macrotask = __webpack_require__(71).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(25)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(9);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(5)
	  , core        = __webpack_require__(6)
	  , dP          = __webpack_require__(10)
	  , DESCRIPTORS = __webpack_require__(14)
	  , SPECIES     = __webpack_require__(57)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(57)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ }),
/* 77 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cache = function () {
	    function Cache(options) {
	        _classCallCheck(this, Cache);

	        this._options = Object.assign({}, options, {
	            cacheKey: 'swa_js_default_cache',
	            queueFailureMax: 200
	        });
	    }

	    _createClass(Cache, [{
	        key: 'save',
	        value: function save(data) {
	            var queue = this.retrieve();
	            data.forEach(function (dto) {
	                queue.push(dto);
	            });
	            this._update(queue);
	        }
	    }, {
	        key: 'retrieve',
	        value: function retrieve() {
	            var data = JSON.parse(localStorage.getItem(this._options.cacheKey)) || { queue: [] };
	            return data.queue;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this._update([]);
	        }
	    }, {
	        key: '_update',
	        value: function _update(queue) {
	            while (queue.length > this._options.queueFailureMax) {
	                queue.shift();
	            }
	            try {
	                localStorage.setItem(this._options.cacheKey, JSON.stringify({ queue: queue }));
	            } catch (e) {
	                if (this._options.log) this._options.log('localStorage is full or not available.');
	            }
	        }
	    }]);

	    return Cache;
	}();

	exports.default = Cache;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = RecoveryHandler;

	var _Cache = __webpack_require__(77);

	var _Cache2 = _interopRequireDefault(_Cache);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function RecoveryHandler(factory, options) {
	    var cache = options.cache || new _Cache2.default();
	    var queue = cache.retrieve();
	    cache.clear();
	    var cacheEvents = function cacheEvents(events) {
	        if (events && Array.isArray(events)) {
	            options.log('caching events:', events.length);
	            cache.save(events);
	        }
	    };
	    options.updateOptions({
	        eventRecovery: cacheEvents
	    });

	    if (queue && queue.length) {
	        options.log('flushing from cache:', queue.length);
	        queue.push('flush');
	        queue.forEach(factory);
	    }
	    window.addEventListener('beforeunload', function () {
	        factory('save');
	    });

	    // flush queue every 30 seconds
	    setTimeout(function () {
	        return factory('flush');
	    }, 30000);
	} /**
	   * Created by adrianj on 11/11/16.
	   */

/***/ }),
/* 79 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = ApiHandler;
	function ApiHandler(factory, options) {
	    var queue = window._splunk_metrics_events;
	    var push = function push(item) {
	        if (item.type === 'config') {
	            options.updateOptions(item.data);
	        } else {
	            factory(item);
	        }
	    };

	    window._splunk_metrics_events = { push: push };
	    if (queue && queue.forEach) {
	        queue.forEach(function (item) {
	            return push(item);
	        });
	    }
	}

	/**
	 * plucks all the config event from the queue and updates swa._options
	 * before swa starts processing events to allow developers to change the config.
	 * @param options
	 */

	ApiHandler.init = function init(options) {
	    // if global does not exist or is not an array with reduce then do nothing.
	    if (!window._splunk_metrics_events || !window._splunk_metrics_events.reduce) return;

	    var newQueue = [];
	    var configs = window._splunk_metrics_events.reduce(function (accumulator, value) {
	        if (value.type === 'config') {
	            accumulator.push(value);
	        } else {
	            newQueue.push(value);
	        }
	        return accumulator;
	    }, []);
	    window._splunk_metrics_events = newQueue;

	    configs.forEach(function (event) {
	        return options.updateOptions(event.data);
	    });
	};

/***/ }),
/* 80 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = PageHandler;
	function PageHandler(factory) {
	    var event = {
	        type: 'pageview'
	    };
	    return factory(event);
	}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Promise) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Event = __webpack_require__(82);

	var _Event2 = _interopRequireDefault(_Event);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventQueue = function () {
	    /**
	     * PUBLIC API                                                                          *
	     **************************************************************************************
	     * */
	    /**
	     * @param options - Pass in SWACore options to construct event queue
	     * @param dispatcher - Pass in dispatcher to send events from queue
	     */
	    function EventQueue(options, dispatcher) {
	        _classCallCheck(this, EventQueue);

	        this._options = options;
	        this._dispatcher = dispatcher;
	        this.factory = this.push.bind(this);
	        this._events = [];
	    }

	    /**
	     * Adds data into queue. Once queue reaches QUEUE_SIZE, it will send data.
	     *
	     * all events should format is  { type,  data ,timestamp, date}
	     *
	     * @param {string} eventType - The type of event.
	     * @param {Object} event - Data to push to queue.
	     */


	    _createClass(EventQueue, [{
	        key: 'push',
	        value: function push(pevent) {
	            var response = void 0;
	            var event = this._createEvent(pevent);
	            if (!event) {
	                return response;
	            }
	            if (event.type === 'final' || event.type === 'unload' || event.type === 'flush') {
	                response = this.flush(event.type);
	            } else if (event && event.type === 'save') {
	                this._options.eventRecovery(this._events);
	            } else {
	                this._options.log('Pushing Data To Queue:', event);
	                this._events.push(event);
	                if (this.getQueueSize() >= this._options.maxQueueSize) {
	                    response = this._send(this._events);
	                    this._emptyQueue();
	                } else {
	                    response = Promise.resolve();
	                }
	            }
	            this._options.log('Current Queue:', this._events);
	            return response;
	        }

	        /**
	         * Flush out queue and sends all data.
	         * @param {string} flush - Type of flush: 'flush' or 'unload'
	         */

	    }, {
	        key: 'flush',
	        value: function flush(_flush) {
	            var response = void 0;
	            this._options.log('Flushing Queue (' + _flush + '):', this._events);
	            if (this.getQueueSize() > 0) {
	                if (_flush === 'flush') {
	                    response = this._send(this._events);
	                } else if (_flush === 'final' || _flush === 'unload') {
	                    // For unload, dispatch remaining data using sendBeacon method
	                    response = this._send(this._events, true);
	                }
	                this._emptyQueue();
	            } else {
	                response = Promise.resolve();
	            }

	            return response;
	        }

	        /**
	         * @returns {*|Number} Size of the queue
	         */

	    }, {
	        key: 'getQueueSize',
	        value: function getQueueSize() {
	            return this._events.length;
	        }

	        /** *********************************************************************************
	         * PRIVATE FUNCTIONS
	         ***********************************************************************************
	         */

	    }, {
	        key: '_createEvent',
	        value: function _createEvent(pevent) {
	            var event = typeof pevent === 'string' ? { type: pevent } : pevent;
	            var er = _Event2.default.checkParams(event);
	            if (er.length > 0) {
	                this._options.log('Cant create Event', er);
	                return false;
	            }
	            return new _Event2.default(event, this._options.experienceID, this._options.userID, this._options.deploymentID, this._options.visibility);
	        }

	        /**
	         * Sends data to dispatcher.
	         * @param {Object} data - Data to send.
	         * @private
	         */

	    }, {
	        key: '_send',
	        value: function _send(data) {
	            var _this = this;

	            var final = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            return this._dispatcher.sendData(data, final).catch(function (error) {
	                _this._options.eventRecovery(error.events);
	            });
	        }

	        /**
	         * Empties the queue.
	         * @private
	         */

	    }, {
	        key: '_emptyQueue',
	        value: function _emptyQueue() {
	            this._events = [];
	        }
	    }]);

	    return EventQueue;
	}();

	exports.default = EventQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _constants = __webpack_require__(42);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Event = function () {
	    /**
	     * Creates an Event. (All params are required)
	     * @param {object} eventData - Event data.
	     * @param {string} deploymentID - ID of the Deployment.
	     * @param {string} experienceID - ID of the Session.
	     * @param {string} userID - ID of the current user.
	     * @returns {*}
	     */
	    function Event(eventData, experienceID, userID, deploymentID, visibility) {
	        _classCallCheck(this, Event);

	        this._type = eventData.type;
	        this.data = eventData.data || {};
	        this.experienceID = eventData.experienceID || experienceID;
	        this.userID = eventData.userID || userID;
	        this._timestamp = eventData.timestamp || parseInt(Date.now() / 1000, 10);

	        this.visibility = eventData.visibility || visibility;

	        this.deploymentID = eventData.deploymentID || deploymentID;
	        this.eventID = eventData.eventID || Event._generateExperienceID();

	        if (!this.data.app || !this.data.page) {
	            var pageData = Event.getPageData(Event.getURL());

	            if (!this.data.app) {
	                this.data.app = pageData.app;
	            }
	            if (!this.data.page) {
	                this.data.page = pageData.page;
	            }
	        }
	        return this;
	    }

	    _createClass(Event, [{
	        key: 'toJSON',
	        value: function toJSON() {
	            return {
	                __type: 'Event',
	                data: this.data,
	                type: this._type,
	                timestamp: this._timestamp,
	                visibility: this.visibility,
	                experienceID: this.experienceID,
	                deploymentID: this.deploymentID,
	                userID: this.userID,
	                eventID: this.eventID
	            };
	        }
	    }, {
	        key: 'toPayload',
	        value: function toPayload() {
	            var result = {};
	            result.component = 'app.session.' + this.type;
	            result.data = this.data;
	            result.timestamp = this.timestamp;
	            result.visibility = this.visibility;
	            result.experienceID = this.experienceID;
	            result.deploymentID = this.deploymentID;
	            result.userID = this.userID;
	            result.eventID = this.eventID;
	            return result;
	        }
	    }, {
	        key: 'type',
	        get: function get() {
	            return this._type;
	        }
	    }, {
	        key: 'timestamp',
	        get: function get() {
	            return this._timestamp;
	        }
	    }], [{
	        key: 'getURL',
	        value: function getURL() {
	            if (window && window.location) {
	                return window.location.href;
	            }
	            return null;
	        }
	    }, {
	        key: 'getPageData',
	        value: function getPageData(url) {
	            var unknown = {
	                app: 'UNKNOWN_APP',
	                page: 'UNKNOWN_PAGE'
	            };

	            if (_constants2.default.FOREIGN_PAGE_CONTEXT) {
	                // Couldn't find $C, no locale known,
	                // no chance of parsing page data.
	                // May happen when rendering pages
	                // through 3rd party custom controllers.
	                return unknown;
	            }

	            return Event.getHelpPageData(url) || Event.getAppPageData(url) || Event.getSystemPageData(url) || unknown;
	        }
	    }, {
	        key: 'getHelpPageData',
	        value: function getHelpPageData(url) {
	            var match = url.match(_constants2.default.HELP_PAGE_DATA_REGEXP);
	            if (match) {
	                return {
	                    app: _constants2.default.SYSTEM_APP_NAME,
	                    page: 'help/' + match[1]
	                };
	            }
	            return null;
	        }
	    }, {
	        key: 'getAppPageData',
	        value: function getAppPageData(url) {
	            var match = url.match(_constants2.default.APP_PAGE_DATA_REGEXP);
	            if (match) {
	                return {
	                    app: match[1],
	                    page: match[2]
	                };
	            }
	            return null;
	        }
	    }, {
	        key: 'getSystemPageData',
	        value: function getSystemPageData(url) {
	            var match = url.match(_constants2.default.SYSTEM_PAGE_DATA_REGEXP);

	            if (match) {
	                var page = match[1];

	                var usernameMatch = url.match(_constants2.default.USERNAME_OBSCURE_REGEXP);
	                if (usernameMatch) {
	                    // This regexp found a username in capture group 2,
	                    // so drop it, and join the prefix & suffix.
	                    page = usernameMatch[1] + '$USERNAME' + usernameMatch[3];
	                }

	                return {
	                    app: _constants2.default.SYSTEM_APP_NAME,
	                    page: page
	                };
	            }
	            return null;
	        }
	    }, {
	        key: 'isString',
	        value: function isString(obj) {
	            return Object.prototype.toString.call(obj) === '[object String]';
	        }

	        /**
	         * Checks all params of constructor if defined, else throw an error.
	         * @param {object} eventData - Event data.
	         * @returns list of errors
	         * @private
	         */

	    }, {
	        key: 'checkParams',
	        value: function checkParams(eventData) {
	            var errors = [];
	            if (!eventData.type || !Event.isString(eventData.type)) {
	                errors.push('type parameter has to be a string');
	                return errors;
	            }
	            return true;
	        }
	    }, {
	        key: '_generateExperienceID',
	        value: function _generateExperienceID() {
	            function seed() {
	                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	            }

	            return '' + seed() + seed() + '-' + seed() + '-' + seed() + '-' + seed() + '-' + seed() + seed() + seed();
	        }
	    }]);

	    return Event;
	}();

	exports.default = Event;

/***/ }),
/* 83 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var NA = 'not available';

	var newSession = null;

	function strip(string, symb) {
	    var end = string.indexOf(symb);
	    if (end !== -1) {
	        return string.substring(0, end);
	    }
	    return string;
	}

	// Getting value from document.cookie
	function getValueFromCookie(regex) {
	    var token = document.cookie;
	    var match = token.match(regex) || [];
	    return match[1];
	}

	function setValueToCookie(key, value) {
	    document.cookie = key + '=' + value + '; path=/';
	}

	function getOsInfo(userAgent) {
	    if (!userAgent) {
	        return {
	            os: NA,
	            osVersion: NA
	        };
	    }
	    var osName = '';
	    var osVersion = '';

	    /*
	    s: os name
	    r: regex for searching
	    */

	    var osInfo = [{ s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ }, { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ }, { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ }, { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ }, { s: 'Windows Vista', r: /Windows NT 6.0/ }, { s: 'Windows Server 2003', r: /Windows NT 5.2/ }, { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ }, { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ }, { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ }, { s: 'Windows 98', r: /(Windows 98|Win98)/ }, { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ }, { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ }, { s: 'Windows CE', r: /Windows CE/ }, { s: 'Windows 3.11', r: /Win16/ }, { s: 'Android', r: /Android/ }, { s: 'Open BSD', r: /OpenBSD/ }, { s: 'Sun OS', r: /SunOS/ }, { s: 'Ubuntu', r: /Ubuntu/ }, { s: 'Linux', r: /(Linux|X11)/ }, { s: 'iOS', r: /(iPhone|iPad|iPod)/ }, { s: 'Mac OS X', r: /Mac OS X/ }, { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ }, { s: 'QNX', r: /QNX/ }, { s: 'UNIX', r: /UNIX/ }, { s: 'OS/2', r: /OS\/2/ }];

	    for (var i = 0; i < osInfo.length; i += 1) {
	        var val = osInfo[i];
	        if (val.r.test(userAgent)) {
	            osName = val.s;
	            break;
	        }
	    }

	    if (/Windows/.test(osName)) {
	        osVersion = /Windows (.*)/.exec(osName)[1];
	        osName = 'Windows';
	    }

	    var versionInfo = {
	        'Mac OS X': /Mac OS X (10[._d]+)/,
	        Android: /Android ([._\d]+)/,
	        iOS: /OS (\d+)_(\d+)_?(\d+)?/
	    };

	    if (versionInfo[osName]) {
	        osVersion = '';
	        var substring = versionInfo[osName].exec(userAgent);
	        if (substring) {
	            osVersion = substring[1].replace(/_/g, '.');
	            osVersion = osVersion.substr(0, Math.min(osVersion.length, 5));
	        }
	    }

	    return {
	        osName: osName,
	        osVersion: osVersion
	    };
	}

	function getBrowserInfo(userAgent) {
	    if (!userAgent) {
	        return {
	            browserName: NA,
	            browserVersion: NA
	        };
	    }
	    var browserName = '';
	    var browserVersion = '';

	    /*
	    s: the browser name
	    r: regex for searching name
	    ofs: offset for Version
	    ofsV: if userAgent has Version keyword, this is the offset we want
	    */
	    var browserInfo = [{ s: 'Opera', r: 'Opera', ofs: 6, ofsV: 8 }, { s: 'Opera', r: 'OPR', ofs: 4 }, { s: 'Microsoft Edge', r: 'Edge', ofs: 5 }, { s: 'Microsoft Internet Explorer', r: 'MSIE', ofs: 5 }, { s: 'Chrome', r: 'Chrome', ofs: 7 }, { s: 'Safari', r: 'Safari', ofs: 7, ofsV: 8 }, { s: 'Firefox', r: 'Firefox', ofs: 8 }, { s: 'Microsoft Internet Explorer', r: 'rv:', ofs: 3 }, { s: 'Other', r: '' }];
	    var separator = [';', ' ', ')'];
	    for (var i = 0; i < browserInfo.length; i += 1) {
	        var browser = browserInfo[i];
	        var offset = void 0;
	        offset = userAgent.indexOf(browser.r);
	        if (offset !== -1) {
	            browserName = browser.s;
	            browserVersion = userAgent.substring(offset + browser.ofs);
	            offset = userAgent.indexOf('Version');
	            if (offset !== -1) {
	                browserVersion = userAgent.substring(offset + browser.ofsV);
	            }
	            break;
	        }

	        // special handling for other browser
	        if (browser.s === 'Other') {
	            var nameOffset = userAgent.lastIndexOf(' ') + 1;
	            var verOffset = userAgent.lastIndexOf('/');
	            browserName = userAgent.substring(nameOffset, verOffset);
	            browserVersion = userAgent.substring(verOffset + 1);
	            if (browserName.toLowerCase() === browserName.toUpperCase()) {
	                browserVersion = window.navigator.appName;
	            }
	            break;
	        }
	    }

	    separator.forEach(function (s) {
	        browserVersion = strip(browserVersion, s);
	    });

	    return {
	        browserName: browserName,
	        browserVersion: browserVersion
	    };
	}

	function generateExperienceID() {
	    function seed() {
	        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	    }
	    return '' + seed() + seed() + '-' + seed() + '-' + seed() + '-' + seed() + '-' + seed() + seed() + seed();
	}

	function sendEvent(factory, options) {
	    var platform = void 0;
	    var userAgent = void 0;

	    if (window.navigator) {
	        userAgent = window.navigator.userAgent;
	        platform = window.navigator.platform;
	    }

	    var osInfo = getOsInfo(userAgent);
	    var browserInfo = getBrowserInfo(userAgent);

	    var event = {
	        type: 'session_start',
	        data: {
	            device: platform || NA,
	            os: osInfo.osName || NA,
	            osVersion: osInfo.osVersion || NA,
	            locale: window.$C.LOCALE || NA,
	            browser: browserInfo.browserName || NA,
	            browserVersion: browserInfo.browserVersion || NA,
	            splunkVersion: window.$C.VERSION_LABEL || NA,
	            guid: options.instanceGUID
	        }
	    };
	    factory(event);
	}

	function SessionHandler(factory, options) {
	    if (newSession) {
	        sendEvent(factory, options);
	        newSession = false;
	    }
	}

	SessionHandler.init = function init(options) {
	    var savedToken = getValueFromCookie(options.cookieSavedTokenKeyRegex);
	    var token = getValueFromCookie(options.cookieCSRFRegex);
	    var experienceID = getValueFromCookie(options.cookieExperienceIDRegex);
	    if (savedToken !== token || !experienceID) {
	        newSession = true;
	        experienceID = generateExperienceID();
	        setValueToCookie(options.savedTokenKey, token);
	        setValueToCookie(options.experienceIDKey, experienceID);
	    }

	    var update = {
	        experienceID: getValueFromCookie(options.cookieExperienceIDRegex)
	    };

	    options.updateOptions(update);
	};

	exports.SessionHandler = SessionHandler;
	exports.getOsInfo = getOsInfo;
	exports.getBrowserInfo = getBrowserInfo;
	exports.getValueFromCookie = getValueFromCookie;
	exports.setValueToCookie = setValueToCookie;

/***/ })
/******/ ]);