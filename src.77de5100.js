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
})({"api.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeNextState = exports.getNewCellState = exports.initalizeGrid = exports.drawBoard = exports.getNeighborIndicies = exports.detectGlider = exports.detectBoat = exports.detectLoaf = exports.detectToad = exports.detectPulsar = exports.detectTub = exports.detectBlinker = exports.detectBlock = exports.detectPatterns = void 0;

exports.detectPatterns = function (cell) {};

exports.detectBlock = function (grid, cell) {
  var cells = [{
    row: cell.row,
    column: cell.column
  }, {
    row: cell.row,
    column: cell.column - 1
  }, {
    row: cell.row - 1,
    column: cell.column - 1
  }, {
    row: cell.row - 1,
    column: cell.column
  }];

  if (grid.filter(function (cell) {
    return cells.some(function (ce) {
      return cell.row === ce.row && cell.column === ce.column;
    }) && cell.active;
  }).length === 4) {
    return true;
  }

  return false;
};

exports.detectBlinker = function (grid, cell) {
  var cells1 = [{
    row: cell.row,
    column: cell.column
  }, {
    row: cell.row - 1,
    column: cell.column
  }, {
    row: cell.row - 2,
    column: cell.column
  }];
  var cells2 = [{
    row: cell.row,
    column: cell.column
  }, {
    row: cell.row,
    column: cell.column - 1
  }, {
    row: cell.row,
    column: cell.column - 2
  }];

  var _loop_1 = function _loop_1(cells) {
    if (grid.filter(function (cell) {
      return cells.some(function (ce) {
        return cell.row === ce.row && cell.column === ce.column;
      }) && cell.active;
    }).length === 3) {
      return {
        value: true
      };
    }
  };

  for (var _i = 0, _a = [cells1, cells2]; _i < _a.length; _i++) {
    var cells = _a[_i];

    var state_1 = _loop_1(cells);

    if (_typeof(state_1) === "object") return state_1.value;
  }

  return false;
};

exports.detectTub = function (grid, cell) {
  var cells = [{
    row: cell.row,
    column: cell.column
  }, {
    row: cell.row - 2,
    column: cell.column
  }, {
    row: cell.row - 1,
    column: cell.column - 1
  }, {
    row: cell.row - 1,
    column: cell.column + 1
  }];

  if (grid.filter(function (cell) {
    return cells.some(function (ce) {
      return cell.row === ce.row && cell.column === ce.column;
    }) && cell.active;
  }).length === 4) {
    return true;
  }

  return false;
};

exports.detectPulsar = function (grid, cell) {
  return false;
};

exports.detectToad = function (grid, cell) {
  return false;
};

exports.detectLoaf = function (grid, cell) {
  var cells = [{
    row: cell.row,
    column: cell.column
  }, {
    row: cell.row - 1,
    column: cell.column - 1
  }, {
    row: cell.row - 2,
    column: cell.column - 2
  }, {
    row: cell.row - 3,
    column: cell.column
  }, {
    row: cell.row - 3,
    column: cell.column - 1
  }, {
    row: cell.row - 1,
    column: cell.column + 1
  }, {
    row: cell.row - 2,
    column: cell.column + 1
  }];

  if (grid.filter(function (cell) {
    return cells.some(function (ce) {
      return cell.row === ce.row && cell.column === ce.column;
    }) && cell.active;
  }).length === 7) {
    return true;
  }

  return false;
};

exports.detectBoat = function (grid, cell) {
  var cells1 = [{
    row: cell.row,
    column: cell.column
  }, {
    row: cell.row,
    column: cell.column - 1
  }, {
    row: cell.row - 1,
    column: cell.column
  }, {
    row: cell.row - 1,
    column: cell.column - 2
  }, {
    row: cell.row - 2,
    column: cell.column - 1
  }];
  var cells2 = [{
    row: cell.row,
    column: cell.column
  }, {
    row: cell.row,
    column: cell.column - 1
  }, {
    row: cell.row - 1,
    column: cell.column
  }, {
    row: cell.row - 1,
    column: cell.column - 2
  }, {
    row: cell.row - 2,
    column: cell.column - 1
  }];

  var _loop_2 = function _loop_2(cells) {
    if (grid.filter(function (cell) {
      return cells.some(function (ce) {
        return cell.row === ce.row && cell.column === ce.column;
      }) && cell.active;
    }).length === 5) {
      return {
        value: true
      };
    }
  };

  for (var _i = 0, _a = [cells1, cells2]; _i < _a.length; _i++) {
    var cells = _a[_i];

    var state_2 = _loop_2(cells);

    if (_typeof(state_2) === "object") return state_2.value;
  }

  return false;
};

exports.detectGlider = function (grid, cell) {
  return false;
};

exports.getNeighborIndicies = function (grid, cell, rows, columns) {
  var prevRow = cell.row - 1;

  if (prevRow < 0) {
    prevRow = rows;
  }

  var nextRow = cell.row + 1;

  if (nextRow > rows) {
    nextRow = 0;
  }

  var prevColumn = cell.column - 1;

  if (prevColumn < 0) {
    prevColumn = columns;
  }

  var nextColumn = cell.column + 1;

  if (nextColumn > columns) {
    nextColumn = 0;
  }

  var potentialNeighbors = [{
    row: nextRow,
    column: cell.column
  }, {
    row: prevRow,
    column: cell.column
  }, {
    row: cell.row,
    column: prevColumn
  }, {
    row: cell.row,
    column: nextColumn
  }, {
    row: nextRow,
    column: nextColumn
  }, {
    row: prevRow,
    column: prevColumn
  }, {
    row: nextRow,
    column: prevColumn
  }, {
    row: prevRow,
    column: nextColumn
  }];
  return grid.filter(function (pr) {
    return potentialNeighbors.some(function (nb) {
      return nb.row === pr.row && nb.column === pr.column;
    });
  }).map(function (pr) {
    return pr.id;
  });
};

exports.drawBoard = function (context, width, height) {
  var size = 15;
  var xOffset = 100;
  var yOffset = 100;
  var rows = 50;
  var columns = 50;
  var borderWidth = 1;
  var newSize = borderWidth + size; //const width = newSize * rows;
  //const height = newSize * rows;

  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
};

exports.initalizeGrid = function (options) {
  var height = options.height,
      width = options.width,
      columns = options.columns,
      rows = options.rows,
      xOffset = options.xOffset,
      yOffset = options.yOffset;
  var sizeX = width / columns;
  var sizeY = height / rows;
  var borderWidth = 1;
  var newSizeX = borderWidth + sizeX;
  var newSizeY = borderWidth + sizeY;
  var grid = Array(rows * columns).fill(0).map(function (pr, index) {
    var row = Math.floor(index / rows);
    var column = index % columns;
    return {
      id: index,
      row: row,
      column: column,
      x: xOffset + newSizeX * column,
      y: yOffset + newSizeY * row,
      sizeX: sizeX,
      sizeY: sizeY,
      active: Boolean(Math.floor(Math.random() * 2)),
      neighborIds: []
    };
  });

  for (var _i = 0, grid_1 = grid; _i < grid_1.length; _i++) {
    var cell = grid_1[_i];
    cell.neighborIds = exports.getNeighborIndicies(grid, cell, rows, columns);
  }

  return grid;
};

exports.getNewCellState = function (grid, cell) {
  var aliveNeighbors = cell.neighborIds.filter(function (neighborId) {
    return grid[neighborId].active;
  }).length;

  if (!cell.active && aliveNeighbors === 3) {
    return true;
  } else if (cell.active && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
    return false;
  }

  return cell.active;
};

exports.computeNextState = function (grid) {
  return new Promise(function (resolve, reject) {
    var newGrid = __spreadArrays(grid.map(function (pr) {
      return __assign({}, pr);
    }));

    var length = newGrid.length;
    var lifes = {};
    var aliveCells = 0;

    for (var i = 0; i < length; i++) {
      var cell = grid[i];
      var newCell = newGrid[i];
      var active = exports.getNewCellState(grid, cell);
      newCell.active = active;
      aliveCells = aliveCells + Number(newCell.active);
      var patterns = exports.detectPatterns(cell); // if(detectBlock(grid, newCell)) {
      //     lifes["block"] = (lifes["block"] || 0) + 1;
      // }
      // if(detectBlinker(grid, newCell)) {
      //     lifes["blinker"] = (lifes["blinker"] || 0) + 1;
      // }
      // if(detectTub(grid, newCell)) {
      //     lifes["tub"] = (lifes["tub"] || 0) + 1;
      // }
      // if(detectLoaf(grid, newCell)) {
      //     lifes["loaf"] = (lifes["loaf"] || 0) + 1;
      // }
      // if(detectBoat(grid, newCell)) {
      //     lifes["boat"] = (lifes["boat"] || 0) + 1;
      // }
      // if(detectGlider(grid, newCell)) {
      //     lifes["glider"] = (lifes["glider"] || 0) + 1;
      // }
    }

    resolve({
      aliveCells: aliveCells,
      grid: newGrid,
      lifes: Object.entries(lifes).map(function (pr, index) {
        return __spreadArrays([index], pr);
      })
    });
  });
};
},{}],"utils/drawing.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setButton = exports.registered = exports.drawCell = exports.setText = void 0;
var baseStyle = {
  fontSize: "30px",
  fontFamily: "Arial",
  color: "#FFF"
};

exports.setText = function (context, options) {
  var combined = __assign(__assign({}, baseStyle), options);

  if (!combined.color || !combined.text || !combined.x || !combined.y) {
    throw new Error("Missing params: x, y, color, text");
  }

  context.fillStyle = combined.color;
  context.font = combined.fontSize + " " + combined.fontFamily;
  var xOffset = context.measureText(combined.text).width;
  context.fillText(combined.text, combined.x - xOffset, combined.y);
};

exports.drawCell = function (context, cell) {
  var x = cell.x,
      y = cell.y,
      sizeX = cell.sizeX,
      sizeY = cell.sizeY,
      active = cell.active;
  var color = "#FFFFFF99";

  if (!active) {
    color = "#000";
  }

  context.fillStyle = color;
  context.fillRect(x, y, sizeX, sizeY);
};

exports.registered = [];

exports.setButton = function (id, context, options, onClickCallback) {
  var combined = __assign(__assign({}, baseStyle), options);

  if (!combined.color || !combined.text || !combined.x || !combined.y) {
    throw new Error("Missing params: x, y, color, text");
  }

  if (!exports.registered.some(function (pr) {
    return pr.id === id;
  })) {
    exports.registered.push({
      id: id,
      startX: combined.x - 10,
      startY: combined.y - 35,
      endX: combined.x + 100,
      endY: combined.y + 50,
      callback: onClickCallback
    });
  }

  context.fillStyle = combined.color;
  context.font = combined.fontSize + " " + combined.fontFamily;
  context.fillText(combined.text, combined.x, combined.y);
  context.strokeStyle = "#FFF";
  context.strokeRect(combined.x - 10, combined.y - 35, 100, 50);
};
},{}],"game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var api_1 = require("./api");

var drawing_1 = require("./utils/drawing");

exports.default = function () {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width = window.innerWidth;
  var height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  var gridOptions = {
    xOffset: width / 5,
    yOffset: height / 9,
    width: width / 2,
    height: height / 1.5,
    rows: 100,
    columns: 100
  };
  canvas.addEventListener("mousemove", function (event) {
    var clientX = event.clientX,
        clientY = event.clientY;

    for (var _i = 0, registered_1 = drawing_1.registered; _i < registered_1.length; _i++) {
      var _a = registered_1[_i],
          startX = _a.startX,
          endX = _a.endX,
          startY = _a.startY,
          endY = _a.endY;

      if (clientX > startX && clientX < endX && clientY > startY && clientY < endY) {
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "initial";
      }
    }
  });
  canvas.addEventListener("click", function (event) {
    var clientX = event.clientX,
        clientY = event.clientY;

    for (var _i = 0, registered_2 = drawing_1.registered; _i < registered_2.length; _i++) {
      var _a = registered_2[_i],
          startX = _a.startX,
          endX = _a.endX,
          startY = _a.startY,
          endY = _a.endY,
          callback = _a.callback;

      if (clientX > startX && clientX < endX && clientY > startY && clientY < endY) {
        callback();
        return;
      }
    }
  });
  window.addEventListener("resize", function () {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    gridOptions.width = width;
    gridOptions.height = height - 200;
    resetTriggered = true;
    grid = api_1.initalizeGrid(gridOptions);
  });

  if (!context) {
    return;
  }

  var grid = api_1.initalizeGrid(gridOptions);
  var dpr = window.devicePixelRatio || 1;
  var bsr = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
  var state = {
    ready: false
  };
  var newGrid = null;
  var lastState = {
    grid: grid,
    lifes: [],
    aliveCells: 0
  };
  var resetTriggered = false;
  var canUpdate = false;

  var getLatestState = function getLatestState() {
    return lastState;
  };

  var tryReplaceState = function tryReplaceState(state) {
    if (canUpdate) {
      if (!resetTriggered) {
        lastState = state;
      }

      resetTriggered = false;
      setTimeout(computeNextStateLoop, 0);
      return;
    }

    setTimeout(tryReplaceState, 5);
  };

  var computeNextStateLoop = function computeNextStateLoop() {
    var grid = lastState.grid;
    api_1.computeNextState(grid).then(function (state) {
      setTimeout(function () {
        return tryReplaceState(state);
      }, 0);
    });
  };

  setTimeout(computeNextStateLoop, 0);
  var currentYear = new Date().getFullYear();

  var onResetClick = function onResetClick() {
    resetTriggered = true;
    grid = api_1.initalizeGrid(gridOptions);
    lastState = {
      grid: grid,
      lifes: [],
      aliveCells: 0
    };
  };

  var loop = function loop() {
    canUpdate = false;
    api_1.drawBoard(context, canvas.width, canvas.height);

    var _a = getLatestState(),
        aliveCells = _a.aliveCells,
        lifes = _a.lifes,
        grid = _a.grid;

    for (var _i = 0, grid_1 = grid; _i < grid_1.length; _i++) {
      var cell = grid_1[_i];
      drawing_1.drawCell(context, cell);
    }

    drawing_1.setText(context, {
      text: "Alive cells " + aliveCells,
      x: width / 5,
      y: height / 10
    });
    drawing_1.setText(context, {
      text: "Game of Life",
      x: width / 2,
      y: height / 10,
      fontSize: "50px"
    }); // setText(context, {
    //     text: "Detected lifes",
    //     x: 1000,
    //     y: 50
    // });

    drawing_1.setButton(1, context, {
      text: "Reset",
      x: width * 2 / 3,
      y: height * 9 / 10
    }, onResetClick); // for(let [index, name, count] of lifes) {
    //     setText(context, {
    //         text: `${name} ${count}`,
    //         x: 1000,
    //         y: index * 50 + 100
    //     });
    // }

    drawing_1.setText(context, {
      text: "J\xF3zef Podlecki " + currentYear,
      x: width / 2,
      y: height * 9 / 10
    });
    canUpdate = true;
    setTimeout(function () {
      requestAnimationFrame(loop);
    }, 30);
  };

  requestAnimationFrame(loop);
};
},{"./api":"api.ts","./utils/drawing":"utils/drawing.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_1 = __importDefault(require("./game"));

window.addEventListener("load", game_1.default);
},{"./game":"game.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61124" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map