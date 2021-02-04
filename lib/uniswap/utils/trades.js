"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTradeBetter = isTradeBetter;

var _index = require("../constants/index");

var _sdk = require("@uniswap/sdk");

// returns whether tradeB is better than tradeA by at least a threshold percentage amount
function isTradeBetter(tradeA, tradeB) {
  var minimumDelta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _index.ZERO_PERCENT;
  if (tradeA && !tradeB) return false;
  if (tradeB && !tradeA) return true;
  if (!tradeA || !tradeB) return undefined;

  if (tradeA.tradeType !== tradeB.tradeType || !(0, _sdk.currencyEquals)(tradeA.inputAmount.currency, tradeB.inputAmount.currency) || !(0, _sdk.currencyEquals)(tradeB.outputAmount.currency, tradeB.outputAmount.currency)) {
    throw new Error('Trades are not comparable');
  }

  if (minimumDelta.equalTo(_index.ZERO_PERCENT)) {
    return tradeA.executionPrice.lessThan(tradeB.executionPrice);
  } else {
    return tradeA.executionPrice.raw.multiply(minimumDelta.add(_index.ONE_HUNDRED_PERCENT)).lessThan(tradeB.executionPrice);
  }
}