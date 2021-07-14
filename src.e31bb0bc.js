// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"settings.js":[function(require,module,exports) {
var offset = {
  x: 30,
  y: 30
};
var tailLength = 10;
var visualRange = 75;
var boidTypes = {
  red: {
    color: '#d33021',
    tailColor: '#d3302166',
    speedLimit: 5,
    count: 20,
    centeringFactor: 0.005,
    matchingFactor: 0.05,
    avoidSelf: {
      distance: 20,
      factor: 0.05
    },
    avoidOther: {
      distance: 10,
      factor: 0.005
    },
    avoidCursor: {
      distance: 100,
      factor: -0.06
    }
  },
  blue: {
    color: '#558cf4',
    tailColor: '#558cf466',
    speedLimit: 10,
    count: 10,
    centeringFactor: 0.005,
    matchingFactor: 0.05,
    avoidSelf: {
      distance: 20,
      factor: 0.05
    },
    avoidOther: {
      distance: 70,
      factor: 1
    },
    avoidCursor: {
      distance: 100,
      factor: 0.06
    }
  },
  yellow: {
    color: '#d38921',
    tailColor: '#d3892166',
    speedLimit: 5,
    count: 15,
    centeringFactor: 0.02,
    matchingFactor: 0.05,
    avoidSelf: {
      distance: 30,
      factor: 0.05
    },
    avoidOther: {
      distance: 70,
      factor: 0.05
    },
    avoidCursor: {
      distance: 0,
      factor: 0
    }
  }
};
module.exports = {
  offset: offset,
  tailLength: tailLength,
  boidTypes: boidTypes,
  visualRange: visualRange
};
},{}],"velocityFunctions.js":[function(require,module,exports) {
"use strict";

var _settings = require("./settings");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var distance = function distance(boid1, boid2) {
  return Math.sqrt((boid1.x - boid2.x) * (boid1.x - boid2.x) + (boid1.y - boid2.y) * (boid1.y - boid2.y));
};

var flyTowardsCenter = function flyTowardsCenter(boid, boids) {
  var centeringFactor = boid.centeringFactor || 0.005;
  var centerX = 0;
  var centerY = 0;
  var numNeighbors = 0;

  var _iterator = _createForOfIteratorHelper(boids),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var otherBoid = _step.value;

      if (otherBoid.type === boid.type && distance(boid, otherBoid) < _settings.visualRange) {
        centerX += otherBoid.x;
        centerY += otherBoid.y;
        numNeighbors += 1;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (numNeighbors) {
    centerX = centerX / numNeighbors;
    centerY = centerY / numNeighbors;
    boid.dx += (centerX - boid.x) * centeringFactor;
    boid.dy += (centerY - boid.y) * centeringFactor;
  }
};

var keepWithinBounds = function keepWithinBounds(boid, width, height) {
  var margin = 200;
  var turnFactor = Math.random();
  var turnFactorx = Math.random() * 0.5 - 0.25;
  var turnFactory = Math.random() * 0.5 - 0.25;
  boid.dx += turnFactorx;
  boid.dy += turnFactory;

  if (boid.x < margin) {
    boid.dx += turnFactor;
  }

  if (boid.x > width - margin) {
    boid.dx -= turnFactor;
  }

  if (boid.y < margin) {
    boid.dy += turnFactor;
  }

  if (boid.y > height - margin) {
    boid.dy -= turnFactor;
  }
};

var limitSpeed = function limitSpeed(boid) {
  var speedLimit = boid.speedLimit || 2;
  var speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);

  if (speed > speedLimit) {
    boid.dx = boid.dx / speed * speedLimit;
    boid.dy = boid.dy / speed * speedLimit;
  }
};

var matchVelocity = function matchVelocity(boid, boids) {
  var matchingFactor = boid.matchingFactor || 0.05;
  var avgDX = 0;
  var avgDY = 0;
  var numNeighbors = 0;

  var _iterator2 = _createForOfIteratorHelper(boids),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var otherBoid = _step2.value;

      if (boid.type === otherBoid.type && distance(boid, otherBoid) < _settings.visualRange) {
        avgDX += otherBoid.dx;
        avgDY += otherBoid.dy;
        numNeighbors += 1;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  if (numNeighbors) {
    avgDX = avgDX / numNeighbors;
    avgDY = avgDY / numNeighbors;
    boid.dx += (avgDX - boid.dx) * matchingFactor;
    boid.dy += (avgDY - boid.dy) * matchingFactor;
  }
};

var avoidSelf = function avoidSelf(boid, boids) {
  var minDistance = boid.avoidSelf.distance || 20;
  var avoidFactor = boid.avoidSelf.factor || 0.05;
  var moveX = 0;
  var moveY = 0;

  var _iterator3 = _createForOfIteratorHelper(boids),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var otherBoid = _step3.value;

      if (otherBoid.type === boid.type && otherBoid !== boid) {
        if (distance(boid, otherBoid) < minDistance) {
          moveX += boid.x - otherBoid.x;
          moveY += boid.y - otherBoid.y;
        }
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  boid.dx += moveX / 2 * avoidFactor;
  boid.dy += moveY / 2 * avoidFactor;
};

var avoidOther = function avoidOther(boid, boids) {
  var minDistance = boid.avoidOther.distance || 20;
  var avoidFactor = boid.avoidOther.factor || 0.05;
  var moveX = 0;
  var moveY = 0;

  var _iterator4 = _createForOfIteratorHelper(boids),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var otherBoid = _step4.value;

      if (otherBoid !== boid) {
        if (otherBoid.type !== boid.type && distance(boid, otherBoid) < minDistance) {
          moveX += boid.x - otherBoid.x;
          moveY += boid.y - otherBoid.y;
        }
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  boid.dx += moveX / 2 * avoidFactor;
  boid.dy += moveY / 2 * avoidFactor;
};

var avoidCursor = function avoidCursor(boid, curser) {
  var minDistance = boid.avoidCursor.distance;
  var avoidFactor = boid.avoidCursor.factor;
  var moveX = 0;
  var moveY = 0;

  if (distance(boid, curser) < minDistance) {
    moveX += boid.x - curser.x;
    moveY += boid.y - curser.y;
  }

  boid.dx += moveX / 2 * avoidFactor;
  boid.dy += moveY / 2 * avoidFactor;
};

module.exports = {
  flyTowardsCenter: flyTowardsCenter,
  keepWithinBounds: keepWithinBounds,
  limitSpeed: limitSpeed,
  matchVelocity: matchVelocity,
  avoidSelf: avoidSelf,
  avoidOther: avoidOther,
  avoidCursor: avoidCursor
};
},{"./settings":"settings.js"}],"boidFuctions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawBoid = exports.makeBoids = void 0;

var _settings = require("./settings");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var makeBoids = function makeBoids(width, height) {
  var boidsArray = [];

  for (var type in _settings.boidTypes) {
    var boidProps = _settings.boidTypes[type];

    for (var i = 0; i < boidProps.count; i++) {
      boidsArray.push(_objectSpread({
        x: Math.random() * (width - 60) + _settings.offset.x,
        // creates a random number between 0 to width
        y: Math.random() * (height - 60) + _settings.offset.y,
        // creates a random number between 0 to height
        dx: Math.random() * 10 - 5,
        // creates a random number between -5 to 5
        dy: Math.random() * 10 - 5,
        // creates a random number between -5 to 5
        history: [],
        type: type
      }, boidProps));
    }
  }

  return boidsArray;
};

exports.makeBoids = makeBoids;

var drawBoid = function drawBoid(context, boid) {
  var angle = Math.atan2(boid.dy, boid.dx);
  context.translate(boid.x, boid.y);
  context.rotate(angle);
  context.translate(-boid.x, -boid.y);
  context.fillStyle = boid.color;
  context.beginPath();
  context.moveTo(boid.x, boid.y);
  context.lineTo(boid.x - 15, boid.y + 5);
  context.lineTo(boid.x - 15, boid.y - 5);
  context.lineTo(boid.x, boid.y);
  context.fill();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.strokeStyle = boid.tailColor;
  context.beginPath();
  context.moveTo(boid.history[0][0], boid.history[0][1]);

  var _iterator = _createForOfIteratorHelper(boid.history),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var point = _step.value;
      context.lineTo(point[0], point[1]);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  context.stroke();
};

exports.drawBoid = drawBoid;
},{"./settings":"settings.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _settings = require("./settings");

var _velocityFunctions = require("./velocityFunctions");

var _boidFuctions = require("./boidFuctions");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var width = window.innerWidth - _settings.offset.x;
var height = window.innerHeight - _settings.offset.y;
var curser = {
  x: 0,
  y: 0
};
var boids = [];

window.onload = function () {
  document.addEventListener('mousemove', function (event) {
    curser.x = event.clientX;
    curser.y = event.clientY;
  });
  resize();
  boids = (0, _boidFuctions.makeBoids)(width, height);
  window.requestAnimationFrame(getNextFrame);
};

window.onresize = function () {
  return resize();
};

var resize = function resize() {
  var root = document.getElementById('root');
  root.width = window.innerWidth - _settings.offset.x;
  root.height = window.innerHeight - _settings.offset.y;
  width = window.innerWidth - _settings.offset.x;
  height = window.innerHeight - _settings.offset.y;
};

var getNextFrame = function getNextFrame() {
  var _iterator = _createForOfIteratorHelper(boids),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var boid = _step.value;
      (0, _velocityFunctions.flyTowardsCenter)(boid, boids);
      (0, _velocityFunctions.matchVelocity)(boid, boids);
      (0, _velocityFunctions.avoidSelf)(boid, boids);
      (0, _velocityFunctions.avoidOther)(boid, boids);
      (0, _velocityFunctions.avoidCursor)(boid, curser);
      (0, _velocityFunctions.limitSpeed)(boid);
      (0, _velocityFunctions.keepWithinBounds)(boid, width, height);
      boid.x += boid.dx;
      boid.y += boid.dy;
      boid.history.push([boid.x, boid.y]);
      boid.history = boid.history.slice(Math.min(-1, -_settings.tailLength));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var context = document.getElementById("root").getContext("2d");
  context.clearRect(0, 0, width, height);

  var _iterator2 = _createForOfIteratorHelper(boids),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _boid = _step2.value;
      (0, _boidFuctions.drawBoid)(context, _boid);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  window.requestAnimationFrame(getNextFrame);
};
},{"./settings":"settings.js","./velocityFunctions":"velocityFunctions.js","./boidFuctions":"boidFuctions.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62229" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map