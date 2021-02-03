"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.fetchV2UnhealthyLoans = void 0;
var minimumCollateralToLiquidate = 0;
var healthFactorMax = 1; //liquidation can happen when less than 1
var theGraphURL_kovan = 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2-kovan';
var theGraphURL_mainnet = 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2';
var allowedLiquidation = .5; //50% of a borrowed asset can be liquidated
var fetchV2UnhealthyLoans = function fetchV2UnhealthyLoans() {
    return __awaiter(this, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            count = 0;
            while (count < 6) {
                fetch(theGraphURL_kovan, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: "\n      query GET_LOANS {\n        users(first:1000, skip:" + 1000 * count + ", orderBy: id, orderDirection: desc, where: {borrowedReservesCount_gt: 0}) {\n          id\n          borrowedReservesCount\n          collateralReserve:reserves(where: {currentATokenBalance_gt: 0}) {\n            currentATokenBalance\n            reserve{\n              usageAsCollateralEnabled\n              reserveLiquidationThreshold\n              reserveLiquidationBonus\n              borrowingEnabled\n              utilizationRate\n              symbol\n              underlyingAsset\n              price {\n                priceInEth\n              }\n              decimals\n            }\n          }\n          borrowReserve: reserves(where: {currentTotalDebt_gt: 0}) {\n            currentTotalDebt\n            reserve{\n              usageAsCollateralEnabled\n              reserveLiquidationThreshold\n              borrowingEnabled\n              utilizationRate\n              symbol\n              underlyingAsset\n              price {\n                priceInEth\n              }\n              decimals\n            }\n          }\n        }\n      }"
                    })
                })
                    .then(function (res) { return res.json(); })
                    .then(function (res) { return parseUsers(res.data); });
                count++;
            }
            return [2 /*return*/];
        });
    });
};
exports.fetchV2UnhealthyLoans = fetchV2UnhealthyLoans;
function parseUsers(payload) {
    console.log("Records:" + payload.users.length + " " + Date().toLocaleString());
    payload.users.forEach(function (user, i) {
        var totalBorrowed = 0;
        var totalCollateral = 0;
        var totalCollateralThreshold = 0;
        var max_borrowedSymbol;
        var max_borrowedPrincipal = 0;
        var max_collateralSymbol;
        var max_collateralBonus = 0;
        user.borrowReserve.forEach(function (borrowReserve, i) {
            var priceInEth = borrowReserve.reserve.price.priceInEth / (Math.pow(10, 18));
            var principalBorrowed = borrowReserve.currentTotalDebt / (Math.pow(10, borrowReserve.reserve.decimals));
            totalBorrowed += priceInEth * principalBorrowed;
            if (principalBorrowed > max_borrowedPrincipal)
                max_borrowedSymbol = borrowReserve.reserve.symbol;
            max_borrowedPrincipal = principalBorrowed;
        });
        user.collateralReserve.forEach(function (collateralReserve, i) {
            var priceInEth = collateralReserve.reserve.price.priceInEth / (Math.pow(10, 18));
            var principalATokenBalance = collateralReserve.currentATokenBalance / (Math.pow(10, collateralReserve.reserve.decimals));
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
            console.log("user_ID:" + user.id + " HealthFactor " + healthFactor.toFixed(2) + " allowedLiquidation " + (max_borrowedPrincipal * allowedLiquidation).toFixed(2) + " " + max_collateralSymbol + "->" + max_borrowedSymbol + " bonus " + profit.toFixed(2));
        }
    });
}
