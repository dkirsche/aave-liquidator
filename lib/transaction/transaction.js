"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signAndSendTransaction = exports.createTx = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Function to call a smart contract method
 * 
 * @param {smart contract to call to} contract 
 * @param {method of smart contract to call to} method 
 * @param {from account of the transaction} from 
 * @param {to address of the contrat} to 
 * @param {array of args to pass to the method} args 
 */
var createTx = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(contract, method, from, to, args) {
    var methodCall, gasPrice, gas, tx;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            methodCall = contract['methods'][method];
            _context.t0 = Number;
            _context.next = 4;
            return web3.eth.getGasPrice();

          case 4:
            _context.t1 = _context.sent;
            gasPrice = (0, _context.t0)(_context.t1);
            _context.next = 8;
            return methodCall.apply(null, args).estimateGas({
              from: from
            })["catch"](function (e) {
              throw Error("Error calculating gas: ".concat(e.message));
            });

          case 8:
            gas = _context.sent;
            tx = {
              from: from,
              to: to,
              data: methodCall.apply(null, args).encodeABI(),
              gas: gas,
              gasPrice: gasPrice,
              gasLimit: gas * gasPrice
            };
            return _context.abrupt("return", tx);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createTx(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Method to sign the transaction and send to the smart contrac
 * 
 * @param {transaction to send} tx 
 * @param {privateKey of the account that create the transaction} privateKey 
 */


exports.createTx = createTx;

var signAndSendTransaction = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(tx, privateKey) {
    var signedTx;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return web3.eth.accounts.signTransaction(tx, privateKey);

          case 2:
            signedTx = _context2.sent;
            return _context2.abrupt("return", web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signAndSendTransaction(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signAndSendTransaction = signAndSendTransaction;