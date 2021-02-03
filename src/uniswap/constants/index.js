"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOCKED_ADDRESSES = exports.ONE_HUNDRED_PERCENT = exports.ZERO_PERCENT = exports.BETTER_TRADE_LESS_HOPS_THRESHOLD = exports.MIN_ETH = exports.BLOCKED_PRICE_IMPACT_NON_EXPERT = exports.PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = exports.ALLOWED_PRICE_IMPACT_HIGH = exports.ALLOWED_PRICE_IMPACT_MEDIUM = exports.ALLOWED_PRICE_IMPACT_LOW = exports.BIPS_BASE = exports.ONE_BIPS = exports.BIG_INT_ZERO = exports.BIG_INT_SECONDS_IN_WEEK = exports.DEFAULT_DEADLINE_FROM_NOW = exports.INITIAL_ALLOWED_SLIPPAGE = exports.NetworkContextName = exports.PINNED_PAIRS = exports.BASES_TO_TRACK_LIQUIDITY_FOR = exports.SUGGESTED_BASES = exports.CUSTOM_BASES = exports.BASES_TO_CHECK_TRADES_AGAINST = exports.MERKLE_DISTRIBUTOR_ADDRESS = exports.COMMON_CONTRACT_NAMES = exports.UNI = exports.TIMELOCK_ADDRESS = exports.GOVERNANCE_ADDRESS = exports.PROPOSAL_LENGTH_IN_SECS = exports.PROPOSAL_LENGTH_IN_BLOCKS = exports.AVERAGE_BLOCK_TIME_IN_SECS = exports.WBTC = exports.AMPL = exports.MKR = exports.COMP = exports.USDT = exports.USDC = exports.DAI = exports.ZERO_ADDRESS = exports.ROUTER_ADDRESS = void 0;
var sdk_1 = require("@uniswap/sdk");
exports.ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
exports.ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.DAI = new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin');
exports.USDC = new sdk_1.Token(sdk_1.ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C');
exports.USDT = new sdk_1.Token(sdk_1.ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD');
exports.COMP = new sdk_1.Token(sdk_1.ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound');
exports.MKR = new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker');
exports.AMPL = new sdk_1.Token(sdk_1.ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth');
exports.WBTC = new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC');
// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
exports.AVERAGE_BLOCK_TIME_IN_SECS = 13;
exports.PROPOSAL_LENGTH_IN_BLOCKS = 40320;
exports.PROPOSAL_LENGTH_IN_SECS = exports.AVERAGE_BLOCK_TIME_IN_SECS * exports.PROPOSAL_LENGTH_IN_BLOCKS;
exports.GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F';
exports.TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC';
var UNI_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
exports.UNI = (_a = {},
    _a[sdk_1.ChainId.MAINNET] = new sdk_1.Token(sdk_1.ChainId.MAINNET, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
    _a[sdk_1.ChainId.RINKEBY] = new sdk_1.Token(sdk_1.ChainId.RINKEBY, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
    _a[sdk_1.ChainId.ROPSTEN] = new sdk_1.Token(sdk_1.ChainId.ROPSTEN, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
    _a[sdk_1.ChainId.GÖRLI] = new sdk_1.Token(sdk_1.ChainId.GÖRLI, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
    _a[sdk_1.ChainId.KOVAN] = new sdk_1.Token(sdk_1.ChainId.KOVAN, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
    _a);
exports.COMMON_CONTRACT_NAMES = (_b = {},
    _b[UNI_ADDRESS] = 'UNI',
    _b[exports.GOVERNANCE_ADDRESS] = 'Governance',
    _b[exports.TIMELOCK_ADDRESS] = 'Timelock',
    _b);
// TODO: specify merkle distributor for mainnet
exports.MERKLE_DISTRIBUTOR_ADDRESS = (_c = {},
    _c[sdk_1.ChainId.MAINNET] = '0x090D4613473dEE047c3f2706764f49E0821D256e',
    _c);
var WETH_ONLY = (_d = {},
    _d[sdk_1.ChainId.MAINNET] = [sdk_1.WETH[sdk_1.ChainId.MAINNET]],
    _d[sdk_1.ChainId.ROPSTEN] = [sdk_1.WETH[sdk_1.ChainId.ROPSTEN]],
    _d[sdk_1.ChainId.RINKEBY] = [sdk_1.WETH[sdk_1.ChainId.RINKEBY]],
    _d[sdk_1.ChainId.GÖRLI] = [sdk_1.WETH[sdk_1.ChainId.GÖRLI]],
    _d[sdk_1.ChainId.KOVAN] = [sdk_1.WETH[sdk_1.ChainId.KOVAN]],
    _d);
// used to construct intermediary pairs for trading
exports.BASES_TO_CHECK_TRADES_AGAINST = __assign(__assign({}, WETH_ONLY), (_e = {}, _e[sdk_1.ChainId.MAINNET] = __spreadArrays(WETH_ONLY[sdk_1.ChainId.MAINNET], [exports.DAI, exports.USDC, exports.USDT, exports.COMP, exports.MKR]), _e));
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
exports.CUSTOM_BASES = (_f = {},
    _f[sdk_1.ChainId.MAINNET] = (_g = {},
        _g[exports.AMPL.address] = [exports.DAI, sdk_1.WETH[sdk_1.ChainId.MAINNET]],
        _g),
    _f);
// used for display in the default list when adding liquidity
exports.SUGGESTED_BASES = __assign(__assign({}, WETH_ONLY), (_h = {}, _h[sdk_1.ChainId.MAINNET] = __spreadArrays(WETH_ONLY[sdk_1.ChainId.MAINNET], [exports.DAI, exports.USDC, exports.USDT]), _h));
// used to construct the list of all pairs we consider by default in the frontend
exports.BASES_TO_TRACK_LIQUIDITY_FOR = __assign(__assign({}, WETH_ONLY), (_j = {}, _j[sdk_1.ChainId.MAINNET] = __spreadArrays(WETH_ONLY[sdk_1.ChainId.MAINNET], [exports.DAI, exports.USDC, exports.USDT]), _j));
exports.PINNED_PAIRS = (_k = {},
    _k[sdk_1.ChainId.MAINNET] = [
        [
            new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
            new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')
        ],
        [exports.USDC, exports.USDT],
        [exports.DAI, exports.USDT]
    ],
    _k);
exports.NetworkContextName = 'NETWORK';
// default allowed slippage, in bips
exports.INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
exports.DEFAULT_DEADLINE_FROM_NOW = 60 * 20;
// used for rewards deadlines
exports.BIG_INT_SECONDS_IN_WEEK = sdk_1.JSBI.BigInt(60 * 60 * 24 * 7);
exports.BIG_INT_ZERO = sdk_1.JSBI.BigInt(0);
// one basis point
exports.ONE_BIPS = new sdk_1.Percent(sdk_1.JSBI.BigInt(1), sdk_1.JSBI.BigInt(10000));
exports.BIPS_BASE = sdk_1.JSBI.BigInt(10000);
// used for warning states
exports.ALLOWED_PRICE_IMPACT_LOW = new sdk_1.Percent(sdk_1.JSBI.BigInt(100), exports.BIPS_BASE); // 1%
exports.ALLOWED_PRICE_IMPACT_MEDIUM = new sdk_1.Percent(sdk_1.JSBI.BigInt(300), exports.BIPS_BASE); // 3%
exports.ALLOWED_PRICE_IMPACT_HIGH = new sdk_1.Percent(sdk_1.JSBI.BigInt(500), exports.BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
exports.PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = new sdk_1.Percent(sdk_1.JSBI.BigInt(1000), exports.BIPS_BASE); // 10%
// for non expert mode disable swaps above this
exports.BLOCKED_PRICE_IMPACT_NON_EXPERT = new sdk_1.Percent(sdk_1.JSBI.BigInt(1500), exports.BIPS_BASE); // 15%
// used to ensure the user doesn't send so much ETH so they end up with <.01
exports.MIN_ETH = sdk_1.JSBI.exponentiate(sdk_1.JSBI.BigInt(10), sdk_1.JSBI.BigInt(16)); // .01 ETH
exports.BETTER_TRADE_LESS_HOPS_THRESHOLD = new sdk_1.Percent(sdk_1.JSBI.BigInt(50), sdk_1.JSBI.BigInt(10000));
exports.ZERO_PERCENT = new sdk_1.Percent('0');
exports.ONE_HUNDRED_PERCENT = new sdk_1.Percent('1');
// SDN OFAC addresses
exports.BLOCKED_ADDRESSES = [
    '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
    '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
    '0x901bb9583b24D97e995513C6778dc6888AB6870e',
    '0xA7e5d5A720f06526557c513402f2e6B5fA20b008'
];
