"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAllCommonPairs = useAllCommonPairs;
exports.useTradeExactIn = useTradeExactIn;
exports.useTradeExactOut = useTradeExactOut;

var _trades = require("./utils/trades");

var _sdk = require("@uniswap/sdk");

var _lodash = _interopRequireDefault(require("lodash.flatmap"));

var _constants = require("./constants");

var _Reserves = require("./data/Reserves");

var _wrappedCurrency = require("./utils/wrappedCurrency");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//import { useUnsupportedTokens } from './Tokens'
function useAllCommonPairs(currencyA, currencyB) {
  var chainId = _sdk.ChainId.MAINNET;
  var bases = chainId ? _constants.BASES_TO_CHECK_TRADES_AGAINST[chainId] : [];

  var _ref = chainId ? [(0, _wrappedCurrency.wrappedCurrency)(currencyA, chainId), (0, _wrappedCurrency.wrappedCurrency)(currencyB, chainId)] : [undefined, undefined],
      _ref2 = _slicedToArray(_ref, 2),
      tokenA = _ref2[0],
      tokenB = _ref2[1];

  var basePairs = (0, _lodash["default"])(bases, function (base) {
    return bases.map(function (otherBase) {
      return [base, otherBase];
    });
  }).filter(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        t0 = _ref4[0],
        t1 = _ref4[1];

    return t0.address !== t1.address;
  });
  var allPairCombinations = tokenA && tokenB ? [// the direct pair
  [tokenA, tokenB]].concat(_toConsumableArray(bases.map(function (base) {
    return [tokenA, base];
  })), _toConsumableArray(bases.map(function (base) {
    return [tokenB, base];
  })), _toConsumableArray(basePairs)).filter(function (tokens) {
    return Boolean(tokens[0] && tokens[1]);
  }).filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        t0 = _ref6[0],
        t1 = _ref6[1];

    return t0.address !== t1.address;
  }).filter(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        tokenA = _ref8[0],
        tokenB = _ref8[1];

    if (!chainId) return true;
    var customBases = _constants.CUSTOM_BASES[chainId];
    if (!customBases) return true;
    var customBasesA = customBases[tokenA.address];
    var customBasesB = customBases[tokenB.address];
    if (!customBasesA && !customBasesB) return true;
    if (customBasesA && !customBasesA.find(function (base) {
      return tokenB.equals(base);
    })) return false;
    if (customBasesB && !customBasesB.find(function (base) {
      return tokenA.equals(base);
    })) return false;
    return true;
  }) : [];
  console.log(allPairCombinations.toString);
  var allPairs = (0, _Reserves.usePairs)(allPairCombinations); // only pass along valid pairs, non-duplicated pairs

  return Object.values(allPairs // filter out invalid pairs
  .filter(function (result) {
    return Boolean(result[0] === _Reserves.PairState.EXISTS && result[1]);
  }) // filter out duplicated pairs
  .reduce(function (memo, _ref9) {
    var _memo$curr$liquidityT;

    var _ref10 = _slicedToArray(_ref9, 2),
        curr = _ref10[1];

    memo[curr.liquidityToken.address] = (_memo$curr$liquidityT = memo[curr.liquidityToken.address]) !== null && _memo$curr$liquidityT !== void 0 ? _memo$curr$liquidityT : curr;
    return memo;
  }, {}));
}

var MAX_HOPS = 3;
/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */

function useTradeExactIn(currencyAmountIn, currencyOut) {
  var allowedPairs = useAllCommonPairs(currencyAmountIn === null || currencyAmountIn === void 0 ? void 0 : currencyAmountIn.currency, currencyOut);
  var singleHopOnly = false;

  if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
    if (singleHopOnly) {
      var _Trade$bestTradeExact;

      return (_Trade$bestTradeExact = _sdk.Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, {
        maxHops: 1,
        maxNumResults: 1
      })[0]) !== null && _Trade$bestTradeExact !== void 0 ? _Trade$bestTradeExact : null;
    } // search through trades with varying hops, find best trade out of them


    var bestTradeSoFar = null;

    for (var i = 1; i <= MAX_HOPS; i++) {
      var _Trade$bestTradeExact2;

      var currentTrade = (_Trade$bestTradeExact2 = _sdk.Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, {
        maxHops: i,
        maxNumResults: 1
      })[0]) !== null && _Trade$bestTradeExact2 !== void 0 ? _Trade$bestTradeExact2 : null; // if current trade is best yet, save it

      if ((0, _trades.isTradeBetter)(bestTradeSoFar, currentTrade, _constants.BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
        bestTradeSoFar = currentTrade;
      }
    }

    return bestTradeSoFar;
  }

  return null;
}
/**
 * Returns the best trade for the token in to the exact amount of token out
 */


function useTradeExactOut(currencyIn, currencyAmountOut) {
  var allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut === null || currencyAmountOut === void 0 ? void 0 : currencyAmountOut.currency);
  var singleHopOnly = false;

  if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
    if (singleHopOnly) {
      var _Trade$bestTradeExact3;

      return (_Trade$bestTradeExact3 = _sdk.Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, {
        maxHops: 1,
        maxNumResults: 1
      })[0]) !== null && _Trade$bestTradeExact3 !== void 0 ? _Trade$bestTradeExact3 : null;
    } // search through trades with varying hops, find best trade out of them


    var bestTradeSoFar = null;

    for (var i = 1; i <= MAX_HOPS; i++) {
      var _Trade$bestTradeExact4;

      var currentTrade = (_Trade$bestTradeExact4 = _sdk.Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, {
        maxHops: i,
        maxNumResults: 1
      })[0]) !== null && _Trade$bestTradeExact4 !== void 0 ? _Trade$bestTradeExact4 : null;

      if ((0, _trades.isTradeBetter)(bestTradeSoFar, currentTrade, _constants.BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
        bestTradeSoFar = currentTrade;
      }
    }

    return bestTradeSoFar;
  }

  return null;
}
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