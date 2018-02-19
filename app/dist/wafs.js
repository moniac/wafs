// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _routie = require("./routie");

var _routie2 = _interopRequireDefault(_routie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  'use strict';

  var settings = {
    sections: document.querySelectorAll('section')
  };
  var app = {
    init: function init() {
      sections.init();
      router.init();
      router.checkHash();
    }
  };
  var router = {
    init: function init() {
      (0, _routie2.default)({
        'home': function home() {
          sections.toggle("home");
        },
        'pokemon': function pokemon() {
          var _this = this;

          sections.toggle("pokemon");

          var fetchPokeList = function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return fetch('https://pokeapi.co/api/v2/pokemon/?limit=151');

                    case 2:
                      _context.next = 4;
                      return _context.sent.json();

                    case 4:
                      return _context.abrupt("return", _context.sent);

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            }));

            return function fetchPokeList() {
              return _ref.apply(this, arguments);
            };
          }();

          fetchPokeList().then(function (data) {

            var directives = {
              name: {
                href: function href() {
                  return "#pokemon/" + this.name;
                }
              }
            };

            var dataPokemon = data.results.map(function (i) {
              return {
                name: i.name,
                url: i.url,
                count: 0 + i
              };
            }).sort(function (a, b) {
              return a.name.localeCompare(b.name);
            });

            var pokemonInput = document.querySelector('#pokemon > input');

            pokemonInput.addEventListener('keyup', function (e) {
              var filteredPokemon = dataPokemon.filter(function (x, i) {
                return x.name.startsWith(e.target.value);
              });

              Transparency.render(document.querySelector('#pokemon-list'), filteredPokemon, directives);
              document.querySelector('#pokemon > p').innerHTML = filteredPokemon.length;
            });

            Transparency.render(document.querySelector('#pokemon-list'), dataPokemon, directives);
            document.querySelector('#pokemon > p').innerHTML = dataPokemon.length;
          }).catch(function (reason) {
            return console.log(reason.message);
          });
        },
        'pokemon/?:name': function pokemonName(name) {
          var _this2 = this;

          var fetchPokeList = function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
              return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return fetch("https://pokeapi.co/api/v2/pokemon/" + name);

                    case 2:
                      _context2.next = 4;
                      return _context2.sent.json();

                    case 4:
                      return _context2.abrupt("return", _context2.sent);

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, _this2);
            }));

            return function fetchPokeList() {
              return _ref2.apply(this, arguments);
            };
          }();

          fetchPokeList().then(function (data) {
            var directives = {
              sprite: {
                src: function src() {
                  return "" + this.sprite;
                },
                alt: function alt() {
                  // still providing a dynamic alt
                  return "A sprite image of the pokemon " + this.name;
                }
              }
            };

            var pokeDetails = {
              name: data.name,
              id: data.id,
              sprite: data.sprites.front_default
            };

            sections.toggle(name);
            // dit kan netter: DRY
            document.querySelector('#pokemon-detail').classList.remove('hidden');
            document.querySelector('#pokemon > input').value = '';
            Transparency.render(document.querySelector('#pokemon-detail'), pokeDetails, directives);
          });
        }
      });
    },
    checkHash: function checkHash() {
      if (window.location.hash) {
        sections.toggle(helpers.splitHash(location.hash));
      } else {
        document.querySelector('#home').classList.remove('hidden');
      }
    }
  };
  var sections = {
    init: function init() {
      settings.sections.forEach(function (el) {
        el.classList.add('hidden');
      });
    },
    toggle: function toggle(route) {
      settings.sections.forEach(function (el) {
        if (el.id === route) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      });
    }
  };

  var helpers = {
    splitHash: function splitHash(hash) {
      return hash.split('#')[1];
    }
  };
  // app.init()
})();
},{"./routie":4,"babel-runtime/regenerator":14,"babel-runtime/helpers/asyncToGenerator":15}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent) {
  var ws = new WebSocket('ws://localhost:53010/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      window.location.reload();
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error(`[parcel] 🚨 ${data.error.message}\n${data.error.stack}`);
    }
  };
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
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,6])