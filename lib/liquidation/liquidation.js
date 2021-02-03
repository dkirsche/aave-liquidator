"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.liquidate = void 0;

var _contractInstances = require("../contracts/contractInstances");

var _contractCalls = require("../contracts/contractCalls");

var _ERC20ABI = _interopRequireDefault(require("../../abi/ERC20ABI.json"));

var _LendingPoolAddressesProvider = _interopRequireDefault(require("../../abi/LendingPoolAddressesProvider.json"));

var _LendingPool = _interopRequireDefault(require("../../abi/LendingPool.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var liquidate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(collateral, reserve, user, purchaseAmount, receiveAToken) {
    var lpAddressProviderContract, lpAddress, lpCoreAddress, lpContract, erc20Contract, liquidate;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Gets the Lending pool provider contract
            lpAddressProviderContract = new web3.eth.Contract(_LendingPoolAddressesProvider["default"], lpAddressProviderAddress); //Get the lending pool address

            _context.next = 3;
            return (0, _contractInstances.getLendingPoolAddress)(lpAddressProviderContract);

          case 3:
            lpAddress = _context.sent;
            _context.next = 6;
            return (0, _contractInstances.getLpCoreAddress)(lpAddressProviderContract);

          case 6:
            lpCoreAddress = _context.sent;
            _context.next = 9;
            return new web3.eth.Contract(_LendingPool["default"], lpAddress);

          case 9:
            lpContract = _context.sent;
            //Erc20 contract of the reserve to allow spend tokens to lending pool
            erc20Contract = new web3.eth.Contract(_ERC20ABI["default"], reserve); //Approves the lending core pool to spend our tokens

            _context.next = 13;
            return (0, _contractCalls.approveErc20)(erc20Contract, lpCoreAddress, web3.utils.toWei(purchaseAmount, "ether"), fromAccount, reserve);

          case 13:
            _context.next = 15;
            return (0, _contractCalls.liquidationCall)(lpContract, lpAddress, collateral, user, web3.utils.toWei(purchaseAmount, "ether"), reserve, receiveAToken)["catch"](function (e) {
              console.log(e);
              throw Error("Error on liquidation call: ".concat(e.message));
            });

          case 15:
            liquidate = _context.sent;
            console.log(liquidate);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function liquidate(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.liquidate = liquidate;