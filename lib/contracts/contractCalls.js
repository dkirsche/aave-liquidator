"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.approveErc20 = exports.liquidationCall = void 0;

var _transaction = require("../transaction/transaction");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * 
 * @param {Lending pool contrac} lpContract 
 * @param {*} lpAddress 
 * @param {*} collateralAddress 
 * @param {*} userLiquidated 
 * @param {*} purchaseAmount 
 * @param {*} reserve 
 * @param {*} receiveATokens 
 * @param {*} fromAccount 
 */
var liquidationCall = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(lpContract, lpAddress, collateralAddress, userLiquidated, purchaseAmount, reserve, receiveATokens, fromAccount) {
    var tx;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _transaction.createTx)(lpContract, //Contract to call to
            'liquidationCall', //method name
            fromAccount, //from 
            lpAddress, //to
            [collateralAddress, reserve, userLiquidated, purchaseAmount, receiveATokens]);

          case 2:
            tx = _context.sent;
            return _context.abrupt("return", (0, _transaction.signAndSendTransaction)(tx, privateKey));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function liquidationCall(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Approve to spend ERC20 tokens
 * @param {Erc20 contract to approve} contract 
 * @param {Address of the spender} spender 
 * @param {Amount to allow} amount 
 * @param {Address from the transaction} from 
 * @param {Address of the contrac} to 
 */


exports.liquidationCall = liquidationCall;

var approveErc20 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(contract, spender, amount, from, to) {
    var tx;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _transaction.createTx)(contract, //Contract to call to
            'approve', //method name
            from, //from 
            to, //to
            [spender, amount]);

          case 2:
            tx = _context2.sent;
            return _context2.abrupt("return", (0, _transaction.signAndSendTransaction)(tx, privateKey));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function approveErc20(_x9, _x10, _x11, _x12, _x13) {
    return _ref2.apply(this, arguments);
  };
}();

exports.approveErc20 = approveErc20;