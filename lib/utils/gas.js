"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGas = exports.gas_cost = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var gas_cost = 0; //returns gas for rapid time (within 15s)
//https://www.gasnow.org/

exports.gas_cost = gas_cost;

var getGas = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetch("https://www.gasnow.org/api/v3/gas/price?utm_source=85734", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (res) {
              return res.json();
            }).then(function (res) {
              exports.gas_cost = gas_cost = res.data.rapid / 1000000000;
            })["catch"](function (error) {
              console.error('Error:', error);
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getGas() {
    return _ref.apply(this, arguments);
  };
}();

exports.getGas = getGas;