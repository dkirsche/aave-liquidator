"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTradeExactOut = exports.useTradeExactIn = exports.useAllCommonPairs = void 0;
var trades_1 = require("./utils/trades");
var sdk_1 = require("@uniswap/sdk");
var lodash_flatmap_1 = __importDefault(require("lodash.flatmap"));
var constants_1 = require("./constants");
var Reserves_1 = require("./data/Reserves");
var wrappedCurrency_1 = require("./utils/wrappedCurrency");
//import { useUnsupportedTokens } from './Tokens'
function useAllCommonPairs(currencyA, currencyB) {
    var chainId = sdk_1.ChainId.MAINNET;
    var bases = chainId ? constants_1.BASES_TO_CHECK_TRADES_AGAINST[chainId] : [];
    var _a = chainId
        ? [wrappedCurrency_1.wrappedCurrency(currencyA, chainId), wrappedCurrency_1.wrappedCurrency(currencyB, chainId)]
        : [undefined, undefined], tokenA = _a[0], tokenB = _a[1];
    var basePairs = lodash_flatmap_1.default(bases, function (base) { return bases.map(function (otherBase) { return [base, otherBase]; }); }).filter(function (_a) {
        var t0 = _a[0], t1 = _a[1];
        return t0.address !== t1.address;
    });
    var allPairCombinations = tokenA && tokenB
        ? __spreadArrays([
            // the direct pair
            [tokenA, tokenB]
        ], bases.map(function (base) { return [tokenA, base]; }), bases.map(function (base) { return [tokenB, base]; }), basePairs).filter(function (tokens) { return Boolean(tokens[0] && tokens[1]); })
            .filter(function (_a) {
            var t0 = _a[0], t1 = _a[1];
            return t0.address !== t1.address;
        })
            .filter(function (_a) {
            var tokenA = _a[0], tokenB = _a[1];
            if (!chainId)
                return true;
            var customBases = constants_1.CUSTOM_BASES[chainId];
            if (!customBases)
                return true;
            var customBasesA = customBases[tokenA.address];
            var customBasesB = customBases[tokenB.address];
            if (!customBasesA && !customBasesB)
                return true;
            if (customBasesA && !customBasesA.find(function (base) { return tokenB.equals(base); }))
                return false;
            if (customBasesB && !customBasesB.find(function (base) { return tokenA.equals(base); }))
                return false;
            return true;
        })
        : [];
    console.log(allPairCombinations.toString);
    var allPairs = Reserves_1.usePairs(allPairCombinations);
    // only pass along valid pairs, non-duplicated pairs
    return Object.values(allPairs
        // filter out invalid pairs
        .filter(function (result) { return Boolean(result[0] === Reserves_1.PairState.EXISTS && result[1]); })
        // filter out duplicated pairs
        .reduce(function (memo, _a) {
        var _b;
        var curr = _a[1];
        memo[curr.liquidityToken.address] = (_b = memo[curr.liquidityToken.address]) !== null && _b !== void 0 ? _b : curr;
        return memo;
    }, {}));
}
exports.useAllCommonPairs = useAllCommonPairs;
var MAX_HOPS = 3;
/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
function useTradeExactIn(currencyAmountIn, currencyOut) {
    var _a, _b;
    var allowedPairs = useAllCommonPairs(currencyAmountIn === null || currencyAmountIn === void 0 ? void 0 : currencyAmountIn.currency, currencyOut);
    var singleHopOnly = false;
    if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
        if (singleHopOnly) {
            return ((_a = sdk_1.Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 1, maxNumResults: 1 })[0]) !== null && _a !== void 0 ? _a : null);
        }
        // search through trades with varying hops, find best trade out of them
        var bestTradeSoFar = null;
        for (var i = 1; i <= MAX_HOPS; i++) {
            var currentTrade = (_b = sdk_1.Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: i, maxNumResults: 1 })[0]) !== null && _b !== void 0 ? _b : null;
            // if current trade is best yet, save it
            if (trades_1.isTradeBetter(bestTradeSoFar, currentTrade, constants_1.BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                bestTradeSoFar = currentTrade;
            }
        }
        return bestTradeSoFar;
    }
    return null;
}
exports.useTradeExactIn = useTradeExactIn;
/**
 * Returns the best trade for the token in to the exact amount of token out
 */
function useTradeExactOut(currencyIn, currencyAmountOut) {
    var _a, _b;
    var allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut === null || currencyAmountOut === void 0 ? void 0 : currencyAmountOut.currency);
    var singleHopOnly = false;
    if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
        if (singleHopOnly) {
            return ((_a = sdk_1.Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: 1, maxNumResults: 1 })[0]) !== null && _a !== void 0 ? _a : null);
        }
        // search through trades with varying hops, find best trade out of them
        var bestTradeSoFar = null;
        for (var i = 1; i <= MAX_HOPS; i++) {
            var currentTrade = (_b = sdk_1.Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: i, maxNumResults: 1 })[0]) !== null && _b !== void 0 ? _b : null;
            if (trades_1.isTradeBetter(bestTradeSoFar, currentTrade, constants_1.BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                bestTradeSoFar = currentTrade;
            }
        }
        return bestTradeSoFar;
    }
    return null;
}
exports.useTradeExactOut = useTradeExactOut;
/*
export function useIsTransactionUnsupported(currencyIn?: Currency, currencyOut?: Currency): boolean {
  const unsupportedToken: { [address: string]: Token } = useUnsupportedTokens()
  const chainId = ChainId.MAINNET

  const tokenIn = wrappedCurrency(currencyIn, chainId)
  const tokenOut = wrappedCurrency(currencyOut, chainId)

  // if unsupported list loaded & either token on list, mark as unsupported
  if (unsupportedToken) {
    if (tokenIn && Object.keys(unsupportedToken).includes(tokenIn.address)) {
      return true
    }
    if (tokenOut && Object.keys(unsupportedToken).includes(tokenOut.address)) {
      return true
    }
  }

  return false
}
*/
