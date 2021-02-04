"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BLOCKED_ADDRESSES = exports.ONE_HUNDRED_PERCENT = exports.ZERO_PERCENT = exports.BETTER_TRADE_LESS_HOPS_THRESHOLD = exports.MIN_ETH = exports.BLOCKED_PRICE_IMPACT_NON_EXPERT = exports.PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = exports.ALLOWED_PRICE_IMPACT_HIGH = exports.ALLOWED_PRICE_IMPACT_MEDIUM = exports.ALLOWED_PRICE_IMPACT_LOW = exports.BIPS_BASE = exports.ONE_BIPS = exports.BIG_INT_ZERO = exports.BIG_INT_SECONDS_IN_WEEK = exports.DEFAULT_DEADLINE_FROM_NOW = exports.INITIAL_ALLOWED_SLIPPAGE = exports.NetworkContextName = exports.PINNED_PAIRS = exports.BASES_TO_TRACK_LIQUIDITY_FOR = exports.SUGGESTED_BASES = exports.CUSTOM_BASES = exports.BASES_TO_CHECK_TRADES_AGAINST = exports.MERKLE_DISTRIBUTOR_ADDRESS = exports.COMMON_CONTRACT_NAMES = exports.UNI = exports.TIMELOCK_ADDRESS = exports.GOVERNANCE_ADDRESS = exports.PROPOSAL_LENGTH_IN_SECS = exports.PROPOSAL_LENGTH_IN_BLOCKS = exports.AVERAGE_BLOCK_TIME_IN_SECS = exports.WBTC = exports.AMPL = exports.MKR = exports.COMP = exports.USDT = exports.USDC = exports.DAI = exports.ZERO_ADDRESS = exports.ROUTER_ADDRESS = void 0;

var _sdk = require("@uniswap/sdk");

var _UNI, _COMMON_CONTRACT_NAME, _WETH_ONLY;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
exports.ROUTER_ADDRESS = ROUTER_ADDRESS;
var ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'; // a list of tokens by chain

exports.ZERO_ADDRESS = ZERO_ADDRESS;
var DAI = new _sdk.Token(_sdk.ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin');
exports.DAI = DAI;
var USDC = new _sdk.Token(_sdk.ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C');
exports.USDC = USDC;
var USDT = new _sdk.Token(_sdk.ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD');
exports.USDT = USDT;
var COMP = new _sdk.Token(_sdk.ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound');
exports.COMP = COMP;
var MKR = new _sdk.Token(_sdk.ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker');
exports.MKR = MKR;
var AMPL = new _sdk.Token(_sdk.ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth');
exports.AMPL = AMPL;
var WBTC = new _sdk.Token(_sdk.ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC'); // Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time

exports.WBTC = WBTC;
var AVERAGE_BLOCK_TIME_IN_SECS = 13;
exports.AVERAGE_BLOCK_TIME_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS;
var PROPOSAL_LENGTH_IN_BLOCKS = 40320;
exports.PROPOSAL_LENGTH_IN_BLOCKS = PROPOSAL_LENGTH_IN_BLOCKS;
var PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS;
exports.PROPOSAL_LENGTH_IN_SECS = PROPOSAL_LENGTH_IN_SECS;
var GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F';
exports.GOVERNANCE_ADDRESS = GOVERNANCE_ADDRESS;
var TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC';
exports.TIMELOCK_ADDRESS = TIMELOCK_ADDRESS;
var UNI_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
var UNI = (_UNI = {}, _defineProperty(_UNI, _sdk.ChainId.MAINNET, new _sdk.Token(_sdk.ChainId.MAINNET, UNI_ADDRESS, 18, 'UNI', 'Uniswap')), _defineProperty(_UNI, _sdk.ChainId.RINKEBY, new _sdk.Token(_sdk.ChainId.RINKEBY, UNI_ADDRESS, 18, 'UNI', 'Uniswap')), _defineProperty(_UNI, _sdk.ChainId.ROPSTEN, new _sdk.Token(_sdk.ChainId.ROPSTEN, UNI_ADDRESS, 18, 'UNI', 'Uniswap')), _defineProperty(_UNI, _sdk.ChainId.GÖRLI, new _sdk.Token(_sdk.ChainId.GÖRLI, UNI_ADDRESS, 18, 'UNI', 'Uniswap')), _defineProperty(_UNI, _sdk.ChainId.KOVAN, new _sdk.Token(_sdk.ChainId.KOVAN, UNI_ADDRESS, 18, 'UNI', 'Uniswap')), _UNI);
exports.UNI = UNI;
var COMMON_CONTRACT_NAMES = (_COMMON_CONTRACT_NAME = {}, _defineProperty(_COMMON_CONTRACT_NAME, UNI_ADDRESS, 'UNI'), _defineProperty(_COMMON_CONTRACT_NAME, GOVERNANCE_ADDRESS, 'Governance'), _defineProperty(_COMMON_CONTRACT_NAME, TIMELOCK_ADDRESS, 'Timelock'), _COMMON_CONTRACT_NAME); // TODO: specify merkle distributor for mainnet

exports.COMMON_CONTRACT_NAMES = COMMON_CONTRACT_NAMES;

var MERKLE_DISTRIBUTOR_ADDRESS = _defineProperty({}, _sdk.ChainId.MAINNET, '0x090D4613473dEE047c3f2706764f49E0821D256e');

exports.MERKLE_DISTRIBUTOR_ADDRESS = MERKLE_DISTRIBUTOR_ADDRESS;
var WETH_ONLY = (_WETH_ONLY = {}, _defineProperty(_WETH_ONLY, _sdk.ChainId.MAINNET, [_sdk.WETH[_sdk.ChainId.MAINNET]]), _defineProperty(_WETH_ONLY, _sdk.ChainId.ROPSTEN, [_sdk.WETH[_sdk.ChainId.ROPSTEN]]), _defineProperty(_WETH_ONLY, _sdk.ChainId.RINKEBY, [_sdk.WETH[_sdk.ChainId.RINKEBY]]), _defineProperty(_WETH_ONLY, _sdk.ChainId.GÖRLI, [_sdk.WETH[_sdk.ChainId.GÖRLI]]), _defineProperty(_WETH_ONLY, _sdk.ChainId.KOVAN, [_sdk.WETH[_sdk.ChainId.KOVAN]]), _WETH_ONLY); // used to construct intermediary pairs for trading

var BASES_TO_CHECK_TRADES_AGAINST = _objectSpread(_objectSpread({}, WETH_ONLY), {}, _defineProperty({}, _sdk.ChainId.MAINNET, [].concat(_toConsumableArray(WETH_ONLY[_sdk.ChainId.MAINNET]), [DAI, USDC, USDT, COMP, MKR])));
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */


exports.BASES_TO_CHECK_TRADES_AGAINST = BASES_TO_CHECK_TRADES_AGAINST;

var CUSTOM_BASES = _defineProperty({}, _sdk.ChainId.MAINNET, _defineProperty({}, AMPL.address, [DAI, _sdk.WETH[_sdk.ChainId.MAINNET]])); // used for display in the default list when adding liquidity


exports.CUSTOM_BASES = CUSTOM_BASES;

var SUGGESTED_BASES = _objectSpread(_objectSpread({}, WETH_ONLY), {}, _defineProperty({}, _sdk.ChainId.MAINNET, [].concat(_toConsumableArray(WETH_ONLY[_sdk.ChainId.MAINNET]), [DAI, USDC, USDT]))); // used to construct the list of all pairs we consider by default in the frontend


exports.SUGGESTED_BASES = SUGGESTED_BASES;

var BASES_TO_TRACK_LIQUIDITY_FOR = _objectSpread(_objectSpread({}, WETH_ONLY), {}, _defineProperty({}, _sdk.ChainId.MAINNET, [].concat(_toConsumableArray(WETH_ONLY[_sdk.ChainId.MAINNET]), [DAI, USDC, USDT])));

exports.BASES_TO_TRACK_LIQUIDITY_FOR = BASES_TO_TRACK_LIQUIDITY_FOR;

var PINNED_PAIRS = _defineProperty({}, _sdk.ChainId.MAINNET, [[new _sdk.Token(_sdk.ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'), new _sdk.Token(_sdk.ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')], [USDC, USDT], [DAI, USDT]]);

exports.PINNED_PAIRS = PINNED_PAIRS;
var NetworkContextName = 'NETWORK'; // default allowed slippage, in bips

exports.NetworkContextName = NetworkContextName;
var INITIAL_ALLOWED_SLIPPAGE = 50; // 20 minutes, denominated in seconds

exports.INITIAL_ALLOWED_SLIPPAGE = INITIAL_ALLOWED_SLIPPAGE;
var DEFAULT_DEADLINE_FROM_NOW = 60 * 20; // used for rewards deadlines

exports.DEFAULT_DEADLINE_FROM_NOW = DEFAULT_DEADLINE_FROM_NOW;

var BIG_INT_SECONDS_IN_WEEK = _sdk.JSBI.BigInt(60 * 60 * 24 * 7);

exports.BIG_INT_SECONDS_IN_WEEK = BIG_INT_SECONDS_IN_WEEK;

var BIG_INT_ZERO = _sdk.JSBI.BigInt(0); // one basis point


exports.BIG_INT_ZERO = BIG_INT_ZERO;
var ONE_BIPS = new _sdk.Percent(_sdk.JSBI.BigInt(1), _sdk.JSBI.BigInt(10000));
exports.ONE_BIPS = ONE_BIPS;

var BIPS_BASE = _sdk.JSBI.BigInt(10000); // used for warning states


exports.BIPS_BASE = BIPS_BASE;
var ALLOWED_PRICE_IMPACT_LOW = new _sdk.Percent(_sdk.JSBI.BigInt(100), BIPS_BASE); // 1%

exports.ALLOWED_PRICE_IMPACT_LOW = ALLOWED_PRICE_IMPACT_LOW;
var ALLOWED_PRICE_IMPACT_MEDIUM = new _sdk.Percent(_sdk.JSBI.BigInt(300), BIPS_BASE); // 3%

exports.ALLOWED_PRICE_IMPACT_MEDIUM = ALLOWED_PRICE_IMPACT_MEDIUM;
var ALLOWED_PRICE_IMPACT_HIGH = new _sdk.Percent(_sdk.JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute

exports.ALLOWED_PRICE_IMPACT_HIGH = ALLOWED_PRICE_IMPACT_HIGH;
var PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = new _sdk.Percent(_sdk.JSBI.BigInt(1000), BIPS_BASE); // 10%
// for non expert mode disable swaps above this

exports.PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN;
var BLOCKED_PRICE_IMPACT_NON_EXPERT = new _sdk.Percent(_sdk.JSBI.BigInt(1500), BIPS_BASE); // 15%
// used to ensure the user doesn't send so much ETH so they end up with <.01

exports.BLOCKED_PRICE_IMPACT_NON_EXPERT = BLOCKED_PRICE_IMPACT_NON_EXPERT;

var MIN_ETH = _sdk.JSBI.exponentiate(_sdk.JSBI.BigInt(10), _sdk.JSBI.BigInt(16)); // .01 ETH


exports.MIN_ETH = MIN_ETH;
var BETTER_TRADE_LESS_HOPS_THRESHOLD = new _sdk.Percent(_sdk.JSBI.BigInt(50), _sdk.JSBI.BigInt(10000));
exports.BETTER_TRADE_LESS_HOPS_THRESHOLD = BETTER_TRADE_LESS_HOPS_THRESHOLD;
var ZERO_PERCENT = new _sdk.Percent('0');
exports.ZERO_PERCENT = ZERO_PERCENT;
var ONE_HUNDRED_PERCENT = new _sdk.Percent('1'); // SDN OFAC addresses

exports.ONE_HUNDRED_PERCENT = ONE_HUNDRED_PERCENT;
var BLOCKED_ADDRESSES = ['0x7F367cC41522cE07553e823bf3be79A889DEbe1B', '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b', '0x901bb9583b24D97e995513C6778dc6888AB6870e', '0xA7e5d5A720f06526557c513402f2e6B5fA20b008'];
exports.BLOCKED_ADDRESSES = BLOCKED_ADDRESSES;