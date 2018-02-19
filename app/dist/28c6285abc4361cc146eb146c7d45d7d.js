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
})({4:[function(require,module,exports) {
/*!
 * routie - a tiny hash router
 * v0.3.2
 * http://projects.jga.me/routie
 * copyright Greg Allen 2016
 * MIT License
*/
const Routie = function (w, isModule) {
  let routes = [];
  let map = {};
  const reference = 'routie';
  const oldReference = w[reference];

  const Route = function (path, name) {
    this.name = name;
    this.path = path;
    this.keys = [];
    this.fns = [];
    this.params = {};
    this.regex = pathToRegexp(this.path, this.keys, false, false);
  };

  Route.prototype.addHandler = function (fn) {
    this
      .fns
      .push(fn);
  };

  Route.prototype.removeHandler = function (fn) {
    for (let i = 0, c = this.fns.length; i < c; i++) {
      const f = this.fns[i];
      if (fn == f) {
        this
          .fns
          .splice(i, 1);
        return;
      }
    }
  };

  Route.prototype.run = function (params) {
    for (let i = 0, c = this.fns.length; i < c; i++) {
      this
        .fns[i]
        .apply(this, params);
    }
  };

  Route.prototype.match = function (path, params) {
    const m = this
      .regex
      .exec(path);

    if (!m)
      {return false;}

    for (let i = 1, len = m.length; i < len; ++i) {
      const key = this.keys[i - 1];

      const val = (typeof m[i] === 'string')
        ? decodeURIComponent(m[i])
        : m[i];

      if (key) {
        this.params[key.name] = val;
      }
      params.push(val);
    }

    return true;
  };

  Route.prototype.toURL = function (params) {
    let path = this.path;
    for (const param in params) {
      path = path.replace(`/:${param}`, `/${params[param]}`);
    }
    path = path
      .replace(/\/:.*\?/g, '/')
      .replace(/\?/g, '');
    if (path.indexOf(':') != -1) {
      throw new Error(`missing parameters for url: ${path}`);
    }
    return path;
  };

  var pathToRegexp = function (path, keys, sensitive, strict) {
    if (path instanceof RegExp)
      {return path;}
    if (path instanceof Array)
      {path = `(${path.join('|')})`;}
    path = path
      .concat(strict
        ? ''
        : '/?')
      .replace(/\/\(/g, '(?:/')
      .replace(/\+/g, '__plus__')
      .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, (_, slash, format, key, capture, optional) => {
        keys.push({
          name: key,
          optional: !!optional,
        });
        slash = slash || '';
        return `${  optional
																				? ''
																				: slash  }(?:${  optional
																				? slash
																				: ''  }${format || ''  }${capture || (format && '([^/.]+?)' || '([^/]+?)')  })${  optional || ''}`;
      })
      .replace(/([\/.])/g, '\\$1')
      .replace(/__plus__/g, '(.+)')
      .replace(/\*/g, '(.*)');
    return new RegExp(`^${path}$`, sensitive
      ? ''
      : 'i');
  };

  const addHandler = function (path, fn) {
    const s = path.split(' ');
    const name = (s.length == 2)
      ? s[0]
      : null;
    path = (s.length == 2)
      ? s[1]
      : s[0];

    if (!map[path]) {
      map[path] = new Route(path, name);
      routes.push(map[path]);
    }
    map[path].addHandler(fn);
  };

  var routie = function (path, fn) {
    if (typeof fn === 'function') {
      addHandler(path, fn);
      routie.reload();
    } else if (typeof path === 'object') {
      for (const p in path) {
        addHandler(p, path[p]);
      }
      routie.reload();
    } else if (typeof fn === 'undefined') {
      routie.navigate(path);
    }
  };

  routie.lookup = function (name, obj) {
    for (let i = 0, c = routes.length; i < c; i++) {
      const route = routes[i];
      if (route.name == name) {
        return route.toURL(obj);
      }
    }
  };

  routie.remove = function (path, fn) {
    const route = map[path];
    if (!route) {
      return;
    }
    route.removeHandler(fn);
  };

  routie.removeAll = function () {
    map = {};
    routes = [];
  };

  routie.navigate = function (path, options) {
    options = options || {};
    const silent = options.silent || false;

    if (silent) {
      removeListener();
    }
    setTimeout(() => {
      window.location.hash = path;

      if (silent) {
        setTimeout(() => {
																				addListener();
																}, 1);
      }
    }, 1);
  };

  routie.noConflict = function () {
    w[reference] = oldReference;
    return routie;
  };

  const getHash = function () {
    return window
      .location
      .hash
      .substring(1);
  };

  const checkRoute = function (hash, route) {
    const params = [];
    if (route.match(hash, params)) {
      route.run(params);
      return true;
    }
    return false;
  };

  const hashChanged = routie.reload = function () {
    const hash = getHash();
    for (let i = 0, c = routes.length; i < c; i++) {
      const route = routes[i];
      if (checkRoute(hash, route)) {
        return;
      }
    }
  };

  var addListener = function () {
    if (w.addEventListener) {
      w.addEventListener('hashchange', hashChanged, false);
    } else {
      w.attachEvent('onhashchange', hashChanged);
    }
  };

  var removeListener = function () {
    if (w.removeEventListener) {
      w.removeEventListener('hashchange', hashChanged);
    } else {
      w.detachEvent('onhashchange', hashChanged);
    }
  };
  addListener();

  if (isModule) {
    return routie;
  }
  w[reference] = routie;
};

if (typeof module === 'undefined') {
  Routie(window);
} else {
  module.exports = Routie(window, true);
}

},{}],0:[function(require,module,exports) {
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
  var ws = new WebSocket('ws://localhost:52398/');
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
},{}]},{},[0,4])