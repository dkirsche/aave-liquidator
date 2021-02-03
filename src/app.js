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
var sdk_1 = require("@uniswap/sdk");
var globals_1 = require("./globals");
var gas_1 = require("./utils/gas");
require('isomorphic-fetch');
require('dotenv').config();
globals_1.setGlobals();
var collateralAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
var reserveAddress = "0xb36938c51c4f67e5e1112eb11916ed70a772bd75";
var userLiquidated = "0x922257aefb9d47bfe36e7d72288c2cfb56457a40";
var purchaseAmount = '10';
var receiveATokens = false;
//Uniswap constants
var USDC_MAINNET = new sdk_1.Token(sdk_1.ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6);
var DAI_MAINNET = new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18);
var USDC_KOVAN = new sdk_1.Token(sdk_1.ChainId.KOVAN, '0xe22da380ee6B445bb8273C81944ADEB6E8450422', 6);
var DAI_KOVAN = new sdk_1.Token(sdk_1.ChainId.KOVAN, '0xff795577d9ac8bd7d90ee22b6c1703490b6512fd', 18);
var DAI_WETH;
var GAS_USED_ESTIMATE = 1000000;
//-----
/*
liquidate(
    collateralAddress,
    reserveAddress,
    userLiquidated,
    purchaseAmount,
    receiveATokens
)
*/
delayedFetchUnhealthyLoans();
//infinite loop calling fetchUnhealthyLoans
//sleep for 1 minute before each call
function delayedFetchUnhealthyLoans() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(1 == 1)) return [3 /*break*/, 2];
                    console.log("gas cost " + gas_1.gas_cost);
                    console.log("fetching loans");
                    //fetchV2UnhealthyLoans();
                    //updateSwapPrices();
                    gas_1.getGas();
                    return [4 /*yield*/, sleep(60000)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
//fetch all users that have borrowed funds
//calculate HealthFactor
//output all users with Loans that can be liquidated
function fetchUnhealthyLoans() {
    return __awaiter(this, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            count = 0;
            while (count < 6) {
                fetch('https://api.thegraph.com/subgraphs/name/aave/protocol-multy-raw', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: "\n      query GET_LOANS {\n        users(first:1000, skip:" + 1000 * count + ", orderBy: id, orderDirection: desc, where: {borrowedReservesCount_gt: 0}) {\n          id\n          borrowedReservesCount\n          collateralReserve:reserves(where: {principalATokenBalance_gt: 0}) {\n            principalATokenBalance\n            principalBorrows\n            reserve{\n              usageAsCollateralEnabled\n              reserveLiquidationThreshold\n              reserveLiquidationBonus\n              borrowingEnabled\n              utilizationRate\n              symbol\n              underlyingAsset\n              price {\n                priceInEth\n              }\n              decimals\n            }\n          }\n          borrowReserve: reserves(where: {principalBorrows_gt: 0}) {\n            principalATokenBalance\n            principalBorrows\n            reserve{\n              usageAsCollateralEnabled\n              reserveLiquidationThreshold\n              borrowingEnabled\n              utilizationRate\n              symbol\n              underlyingAsset\n              price {\n                priceInEth\n              }\n              decimals\n            }\n          }\n        }\n      }"
                    })
                })
                    .then(function (res) { return res.json(); })
                    .then(function (res) { return parseUsers(res.data); });
                count++;
            }
            return [2 /*return*/];
        });
    });
}
function parseUsers(payload) {
    console.log("Records:" + payload.users.length + " " + Date().toLocaleString());
    payload.users.forEach(function (user, i) {
        var totalBorrowed = 0;
        var totalCollateral = 0;
        var totalCollateralThreshold = 0;
        var borrowedSymbol;
        var collateralSymbol;
        user.borrowReserve.forEach(function (borrowReserve, i) {
            borrowedSymbol = borrowReserve.reserve.symbol;
            var priceInEth = borrowReserve.reserve.price.priceInEth / (Math.pow(10, 18));
            var principalBorrowed = borrowReserve.principalBorrows / (Math.pow(10, borrowReserve.reserve.decimals));
            totalBorrowed += priceInEth * principalBorrowed;
        });
        user.collateralReserve.forEach(function (collateralReserve, i) {
            collateralSymbol = collateralReserve.reserve.symbol;
            var priceInEth = collateralReserve.reserve.price.priceInEth / (Math.pow(10, 18));
            var principalATokenBalance = collateralReserve.principalATokenBalance / (Math.pow(10, collateralReserve.reserve.decimals));
            totalCollateral += priceInEth * principalATokenBalance;
            totalCollateralThreshold += priceInEth * principalATokenBalance * (collateralReserve.reserve.reserveLiquidationThreshold / 100);
        });
        var healthFactor = totalCollateralThreshold / totalBorrowed;
        if (healthFactor <= 1 && totalCollateral > 1)
            console.log("user_ID:" + user.id + " HealthFactor " + healthFactor + " totalCollateral " + totalCollateral + " " + collateralSymbol + "->" + borrowedSymbol);
    });
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function updateSwapPrices() {
    return __awaiter(this, void 0, void 0, function () {
        var pair, route;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk_1.Fetcher.fetchPairData(DAI_KOVAN, sdk_1.WETH[DAI_KOVAN.chainId])];
                case 1:
                    pair = _a.sent();
                    route = new sdk_1.Route([pair], sdk_1.WETH[DAI_KOVAN.chainId]);
                    DAI_WETH = route.midPrice.toSignificant(6);
                    console.log(DAI_WETH + " DAI per WETH"); // 201.306
                    console.log(route.midPrice.invert().toSignificant(6)); // 0.00496756
                    return [2 /*return*/];
            }
        });
    });
}
