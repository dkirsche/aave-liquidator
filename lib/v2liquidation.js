"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchV2UnhealthyLoans = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var minimumCollateralToLiquidate = 0;
var healthFactorMax = 1; //liquidation can happen when less than 1

var theGraphURL_kovan = 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2-kovan';
var theGraphURL_mainnet = 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2';
var allowedLiquidation = .5; //50% of a borrowed asset can be liquidated

var fetchV2UnhealthyLoans = /*#__PURE__*/function () {
  var _fetchV2UnhealthyLoans = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var count;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            count = 0;

            while (count < 6) {
              fetch(theGraphURL_kovan, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: "\n      query GET_LOANS {\n        users(first:1000, skip:".concat(1000 * count, ", orderBy: id, orderDirection: desc, where: {borrowedReservesCount_gt: 0}) {\n          id\n          borrowedReservesCount\n          collateralReserve:reserves(where: {currentATokenBalance_gt: 0}) {\n            currentATokenBalance\n            reserve{\n              usageAsCollateralEnabled\n              reserveLiquidationThreshold\n              reserveLiquidationBonus\n              borrowingEnabled\n              utilizationRate\n              symbol\n              underlyingAsset\n              price {\n                priceInEth\n              }\n              decimals\n            }\n          }\n          borrowReserve: reserves(where: {currentTotalDebt_gt: 0}) {\n            currentTotalDebt\n            reserve{\n              usageAsCollateralEnabled\n              reserveLiquidationThreshold\n              borrowingEnabled\n              utilizationRate\n              symbol\n              underlyingAsset\n              price {\n                priceInEth\n              }\n              decimals\n            }\n          }\n        }\n      }")
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
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function fetchV2UnhealthyLoans() {
    return _fetchV2UnhealthyLoans.apply(this, arguments);
  }

  return fetchV2UnhealthyLoans;
}();

exports.fetchV2UnhealthyLoans = fetchV2UnhealthyLoans;

function parseUsers(payload) {
  console.log("Records:".concat(payload.users.length, " ").concat(Date().toLocaleString()));
  payload.users.forEach(function (user, i) {
    var totalBorrowed = 0;
    var totalCollateral = 0;
    var totalCollateralThreshold = 0;
    var max_borrowedSymbol;
    var max_borrowedPrincipal = 0;
    var max_collateralSymbol;
    var max_collateralBonus = 0;
    user.borrowReserve.forEach(function (borrowReserve, i) {
      var priceInEth = borrowReserve.reserve.price.priceInEth / Math.pow(10, 18);
      var principalBorrowed = borrowReserve.currentTotalDebt / Math.pow(10, borrowReserve.reserve.decimals);
      totalBorrowed += priceInEth * principalBorrowed;
      if (principalBorrowed > max_borrowedPrincipal) max_borrowedSymbol = borrowReserve.reserve.symbol;
      max_borrowedPrincipal = principalBorrowed;
    });
    user.collateralReserve.forEach(function (collateralReserve, i) {
      var priceInEth = collateralReserve.reserve.price.priceInEth / Math.pow(10, 18);
      var principalATokenBalance = collateralReserve.currentATokenBalance / Math.pow(10, collateralReserve.reserve.decimals);
      totalCollateral += priceInEth * principalATokenBalance;
      totalCollateralThreshold += priceInEth * principalATokenBalance * (collateralReserve.reserve.reserveLiquidationThreshold / 10000);

      if (collateralReserve.reserve.reserveLiquidationBonus > max_collateralBonus) {
        max_collateralSymbol = collateralReserve.reserve.symbol;
        max_collateralBonus = collateralReserve.reserve.reserveLiquidationBonus;
      }
    });
    var healthFactor = totalCollateralThreshold / totalBorrowed;

    if (healthFactor <= healthFactorMax && totalCollateral >= minimumCollateralToLiquidate) {
      var profit = max_borrowedPrincipal * allowedLiquidation * (max_collateralBonus / 10000 - 1);
      console.log("user_ID:".concat(user.id, " HealthFactor ").concat(healthFactor.toFixed(2), " allowedLiquidation ").concat((max_borrowedPrincipal * allowedLiquidation).toFixed(2), " ").concat(max_collateralSymbol, "->").concat(max_borrowedSymbol, " bonus ").concat(profit.toFixed(2)));
    }
  });
}