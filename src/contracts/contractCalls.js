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
exports.approveErc20 = exports.liquidationCall = void 0;
var transaction_1 = require("../transaction/transaction");
/**
 *
 * @param {Lending pool contrac} lpContract
 * @param {*} lpAddress
 * @param {*} collateralAddress
 * @param {*} userLiquidated
 * @param {*} purchaseAmount
 * @param {*} reserve
 * @param {*} receiveATokens
 * @param {*} fromAccount
 */
var liquidationCall = function (lpContract, lpAddress, collateralAddress, userLiquidated, purchaseAmount, reserve, receiveATokens, fromAccount) { return __awaiter(void 0, void 0, void 0, function () {
    var tx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, transaction_1.createTx(lpContract, //Contract to call to
                'liquidationCall', //method name
                fromAccount, //from 
                lpAddress, //to
                [collateralAddress, reserve, userLiquidated, purchaseAmount, receiveATokens])]; //params
            case 1:
                tx = _a.sent() //params
                ;
                return [2 /*return*/, transaction_1.signAndSendTransaction(tx, privateKey)];
        }
    });
}); };
exports.liquidationCall = liquidationCall;
/**
 * Approve to spend ERC20 tokens
 * @param {Erc20 contract to approve} contract
 * @param {Address of the spender} spender
 * @param {Amount to allow} amount
 * @param {Address from the transaction} from
 * @param {Address of the contrac} to
 */
var approveErc20 = function (contract, spender, amount, from, to) { return __awaiter(void 0, void 0, void 0, function () {
    var tx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, transaction_1.createTx(contract, //Contract to call to
                'approve', //method name
                from, //from 
                to, //to
                [spender, amount])]; //params
            case 1:
                tx = _a.sent() //params
                ;
                return [2 /*return*/, transaction_1.signAndSendTransaction(tx, privateKey)];
        }
    });
}); };
exports.approveErc20 = approveErc20;
