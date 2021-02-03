"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePair = exports.usePairs = exports.PairState = void 0;
var sdk_1 = require("@uniswap/sdk");
var IUniswapV2Pair_json_1 = require("@uniswap/v2-core/build/IUniswapV2Pair.json");
var abi_1 = require("@ethersproject/abi");
var wrappedCurrency_1 = require("../utils/wrappedCurrency");
var PAIR_INTERFACE = new abi_1.Interface(IUniswapV2Pair_json_1.abi);
var PairState;
(function (PairState) {
    PairState[PairState["LOADING"] = 0] = "LOADING";
    PairState[PairState["NOT_EXISTS"] = 1] = "NOT_EXISTS";
    PairState[PairState["EXISTS"] = 2] = "EXISTS";
    PairState[PairState["INVALID"] = 3] = "INVALID";
})(PairState = exports.PairState || (exports.PairState = {}));
function usePairs(currencies) {
    var chainId = sdk_1.ChainId.MAINNET;
    var tokens = currencies.map(function (_a) {
        var currencyA = _a[0], currencyB = _a[1];
        return [
            wrappedCurrency_1.wrappedCurrency(currencyA, chainId),
            wrappedCurrency_1.wrappedCurrency(currencyB, chainId)
        ];
    });
    var pairAddresses = tokens.map(function (_a) {
        var tokenA = _a[0], tokenB = _a[1];
        return tokenA && tokenB && !tokenA.equals(tokenB) ? sdk_1.Pair.getAddress(tokenA, tokenB) : undefined;
    });
    // see hooks when implementing this function
    //import { useMultipleContractSingleData } from '../state/multicall/hooks'
    //const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
    //todo call getReserves for all token pairs
    //return [[reserve0,reserve1],key]
    var results = [{
            loading: false,
            result: {
                reserve0: 100,
                reserve1: 100
            },
        }];
    return results.map(function (result, i) {
        var reserves = result.result, loading = result.loading;
        var tokenA = tokens[i][0];
        var tokenB = tokens[i][1];
        if (loading)
            return [PairState.LOADING, null];
        if (!tokenA || !tokenB || tokenA.equals(tokenB))
            return [PairState.INVALID, null];
        if (!reserves)
            return [PairState.NOT_EXISTS, null];
        var reserve0 = reserves.reserve0, reserve1 = reserves.reserve1;
        var _a = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA], token0 = _a[0], token1 = _a[1];
        return [
            PairState.EXISTS,
            new sdk_1.Pair(new sdk_1.TokenAmount(token0, reserve0.toString()), new sdk_1.TokenAmount(token1, reserve1.toString()))
        ];
    });
}
exports.usePairs = usePairs;
function usePair(tokenA, tokenB) {
    return usePairs([[tokenA, tokenB]])[0];
}
exports.usePair = usePair;
