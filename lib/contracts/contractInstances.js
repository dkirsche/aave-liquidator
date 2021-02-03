"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getlpContract = exports.getLendingPoolAddress = exports.getLpCoreAddress = exports.getLpAddressProviderContract = void 0;

var _LendingPoolAddressesProvider = _interopRequireDefault(require("../../abi/LendingPoolAddressesProvider.json"));

var _LendingPool = _interopRequireDefault(require("../../abi/LendingPool.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Returns the Lending pool address provider contract
 * @param {contract address} address 
 */
var getLpAddressProviderContract = function getLpAddressProviderContract(address) {
  return new web3.eth.Contract(_LendingPoolAddressesProvider["default"], address);
};
/**
 * Returns the Lending pool core address
 * @param {Address provider contract} lpAddressProviderContract 
 */


exports.getLpAddressProviderContract = getLpAddressProviderContract;

var getLpCoreAddress = function getLpCoreAddress(lpAddressProviderContract) {
  return lpAddressProviderContract.methods.getLendingPoolCore().call()["catch"](function (e) {
    throw Error("Error getting LpCoreAddress address: ".concat(e.message));
  });
};
/**
 * Returns the Lending pool address
 * @param @param {Address provider contract} lpAddressProviderContract 
 */


exports.getLpCoreAddress = getLpCoreAddress;

var getLendingPoolAddress = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(lpAddressProviderContract) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", lpAddressProviderContract.methods.getLendingPool().call()["catch"](function (e) {
              throw Error("Error getting lendingPool address: ".concat(e.message));
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getLendingPoolAddress(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Returns the lending pooll contract
 * @param {Lending pool address} addr 
 */


exports.getLendingPoolAddress = getLendingPoolAddress;

var getlpContract = function getlpContract(addr) {
  return new web3.eth.Contract(_LendingPool["default"], addr);
};

exports.getlpContract = getlpContract;