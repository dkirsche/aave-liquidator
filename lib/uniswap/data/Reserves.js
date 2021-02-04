"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePairs = usePairs;
exports.usePair = usePair;
exports.PairState = void 0;

var _sdk = require("@uniswap/sdk");

var _IUniswapV2Pair = require("@uniswap/v2-core/build/IUniswapV2Pair.json");

var _abi = require("@ethersproject/abi");

var _wrappedCurrency = require("../utils/wrappedCurrency");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PAIR_INTERFACE = new _abi.Interface(_IUniswapV2Pair.abi);
var PairState;
exports.PairState = PairState;

(function (PairState) {
  PairState[PairState["LOADING"] = 0] = "LOADING";
  PairState[PairState["NOT_EXISTS"] = 1] = "NOT_EXISTS";
  PairState[PairState["EXISTS"] = 2] = "EXISTS";
  PairState[PairState["INVALID"] = 3] = "INVALID";
})(PairState || (exports.PairState = PairState = {}));

function usePairs(currencies) {
  var chainId = _sdk.ChainId.MAINNET;
  var tokens = currencies.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        currencyA = _ref2[0],
        currencyB = _ref2[1];

    return [(0, _wrappedCurrency.wrappedCurrency)(currencyA, chainId), (0, _wrappedCurrency.wrappedCurrency)(currencyB, chainId)];
  });
  var pairAddresses = tokens.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        tokenA = _ref4[0],
        tokenB = _ref4[1];

    return tokenA && tokenB && !tokenA.equals(tokenB) ? _sdk.Pair.getAddress(tokenA, tokenB) : undefined;
  }); // see hooks when implementing this function
  //import { useMultipleContractSingleData } from '../state/multicall/hooks'
  //const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
  //todo call getReserves for all token pairs
  //return [[reserve0,reserve1],key]

  var results = [{
    loading: false,
    result: {
      reserve0: 100,
      reserve1: 100
    }
  }];
  return results.map(function (result, i) {
    var reserves = result.result,
        loading = result.loading;
    var tokenA = tokens[i][0];
    var tokenB = tokens[i][1];
    if (loading) return [PairState.LOADING, null];
    if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null];
    if (!reserves) return [PairState.NOT_EXISTS, null];
    var reserve0 = reserves.reserve0,
        reserve1 = reserves.reserve1;

    var _ref5 = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA],
        _ref6 = _slicedToArray(_ref5, 2),
        token0 = _ref6[0],
        token1 = _ref6[1];

    return [PairState.EXISTS, new _sdk.Pair(new _sdk.TokenAmount(token0, reserve0.toString()), new _sdk.TokenAmount(token1, reserve1.toString()))];
  });
}

function usePair(tokenA, tokenB) {
  return usePairs([[tokenA, tokenB]])[0];
}