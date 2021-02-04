"use strict";

var _sdk = require("@uniswap/sdk");

var _trades = require("./uniswap/trades.js");

var _globals = require("./globals");

var _gas = require("./utils/gas");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('isomorphic-fetch');

require('dotenv').config();

(0, _globals.setGlobals)();
var collateralAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
var reserveAddress = "0xb36938c51c4f67e5e1112eb11916ed70a772bd75";
var userLiquidated = "0x922257aefb9d47bfe36e7d72288c2cfb56457a40";
var purchaseAmount = '10';
var receiveATokens = false; //Uniswap constants

var USDC_MAINNET = new _sdk.Token(_sdk.ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6);
var DAI_MAINNET = new _sdk.Token(_sdk.ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18);
var USDC_KOVAN = new _sdk.Token(_sdk.ChainId.KOVAN, '0xe22da380ee6B445bb8273C81944ADEB6E8450422', 6);
var DAI_KOVAN = new _sdk.Token(_sdk.ChainId.KOVAN, '0xff795577d9ac8bd7d90ee22b6c1703490b6512fd', 18);
var DAI_WETH;
var GAS_USED_ESTIMATE = 1000000; //-----

/*
liquidate(
    collateralAddress,
    reserveAddress,
    userLiquidated,
    purchaseAmount,
    receiveATokens
)
*/

delayedFetchUnhealthyLoans(); //infinite loop calling fetchUnhealthyLoans
//sleep for 1 minute before each call

function delayedFetchUnhealthyLoans() {
  return _delayedFetchUnhealthyLoans.apply(this, arguments);
} //fetch all users that have borrowed funds
//calculate HealthFactor
//output all users with Loans that can be liquidated


function _delayedFetchUnhealthyLoans() {
  _delayedFetchUnhealthyLoans = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var dai, aave, dai_amount;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dai = new _sdk.Currency(18, 'DAI', 'Dai Stablecoin');
            aave = new _sdk.Currency(18, 'AAVE', 'AAVE');
            dai_amount = new _sdk.CurrencyAmount(dai, 10000);
            (0, _trades.useAllCommonPairs)(dai, aave); //console.log (useTradeExactIn(dai_amount,aave))

          case 4:
            if (!(1 == 1)) {
              _context.next = 12;
              break;
            }

            console.log("gas cost ".concat(_gas.gas_cost));
            console.log("fetching loans"); //fetchV2UnhealthyLoans();
            //updateSwapPrices();

            (0, _gas.getGas)();
            _context.next = 10;
            return sleep(60000);

          case 10:
            _context.next = 4;
            break;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _delayedFetchUnhealthyLoans.apply(this, arguments);
}

function fetchUnhealthyLoans() {
  return _fetchUnhealthyLoans.apply(this, arguments);
}

function _fetchUnhealthyLoans() {
  _fetchUnhealthyLoans = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var count;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            count = 0;

            while (count < 6) {
              fetch('https://api.thegraph.com/subgraphs/name/aave/protocol-multy-raw', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: "\n      query GET_LOANS {\n        users(first:1000, skip:".concat(1000 * count, ", orderBy: id, orderDirection: desc, where: {borrowedReservesCount_gt: 0}) {\n          id\n          borrowedReservesCount\n          collateralReserve:reserves(where: {principalATokenBalance_gt: 0}) {\n            principalATokenBalance\n            principalBorrows\n            reserve{\n              usageAsCollateralEnabled\n              reserveLiquidationThreshold\n              reserveLiquidationBonus\n              borrowingEnabled\n              utilizationRate\n              symbol\n              underlyingAsset\n              price {\n                priceInEth\n              }\n              decimals\n            }\n          }\n          borrowReserve: reserves(where: {principalBorrows_gt: 0}) {\n            principalATokenBalance\n            principalBorrows\n            reserve{\n              usageAsCollateralEnabled\n              reserveLiquidationThreshold\n              borrowingEnabled\n              utilizationRate\n              symbol\n              underlyingAsset\n              price {\n                priceInEth\n              }\n              decimals\n            }\n          }\n        }\n      }")
                })
              }).then(function (res) {
                return res.json();
              }).then(function (res) {
                return parseUsers(res.data);
              });
              count++;
            }

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _fetchUnhealthyLoans.apply(this, arguments);
}

function parseUsers(payload) {
  console.log("Records:".concat(payload.users.length, " ").concat(Date().toLocaleString()));
  payload.users.forEach(function (user, i) {
    var totalBorrowed = 0;
    var totalCollateral = 0;
    var totalCollateralThreshold = 0;
    var borrowedSymbol;
    var collateralSymbol;
    user.borrowReserve.forEach(function (borrowReserve, i) {
      borrowedSymbol = borrowReserve.reserve.symbol;
      var priceInEth = borrowReserve.reserve.price.priceInEth / Math.pow(10, 18);
      var principalBorrowed = borrowReserve.principalBorrows / Math.pow(10, borrowReserve.reserve.decimals);
      totalBorrowed += priceInEth * principalBorrowed;
    });
    user.collateralReserve.forEach(function (collateralReserve, i) {
      collateralSymbol = collateralReserve.reserve.symbol;
      var priceInEth = collateralReserve.reserve.price.priceInEth / Math.pow(10, 18);
      var principalATokenBalance = collateralReserve.principalATokenBalance / Math.pow(10, collateralReserve.reserve.decimals);
      totalCollateral += priceInEth * principalATokenBalance;
      totalCollateralThreshold += priceInEth * principalATokenBalance * (collateralReserve.reserve.reserveLiquidationThreshold / 100);
    });
    var healthFactor = totalCollateralThreshold / totalBorrowed;
    if (healthFactor <= 1 && totalCollateral > 1) console.log("user_ID:".concat(user.id, " HealthFactor ").concat(healthFactor, " totalCollateral ").concat(totalCollateral, " ").concat(collateralSymbol, "->").concat(borrowedSymbol));
  });
}

function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function updateSwapPrices() {
  return _updateSwapPrices.apply(this, arguments);
}

function _updateSwapPrices() {
  _updateSwapPrices = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var pair, route;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _sdk.Fetcher.fetchPairData(DAI_KOVAN, _sdk.WETH[DAI_KOVAN.chainId]);

          case 2:
            pair = _context3.sent;
            route = new _sdk.Route([pair], _sdk.WETH[DAI_KOVAN.chainId]);
            DAI_WETH = route.midPrice.toSignificant(6);
            console.log("".concat(DAI_WETH, " DAI per WETH")); // 201.306

            console.log(route.midPrice.invert().toSignificant(6)); // 0.00496756

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _updateSwapPrices.apply(this, arguments);
}