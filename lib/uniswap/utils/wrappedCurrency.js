"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrappedCurrency = wrappedCurrency;
exports.wrappedCurrencyAmount = wrappedCurrencyAmount;
exports.unwrappedToken = unwrappedToken;

var _sdk = require("@uniswap/sdk");

function wrappedCurrency(currency, chainId) {
  return chainId && currency === _sdk.ETHER ? _sdk.WETH[chainId] : currency instanceof _sdk.Token ? currency : undefined;
}

function wrappedCurrencyAmount(currencyAmount, chainId) {
  var token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined;
  return token && currencyAmount ? new _sdk.TokenAmount(token, currencyAmount.raw) : undefined;
}

function unwrappedToken(token) {
  if (token.equals(_sdk.WETH[token.chainId])) return _sdk.ETHER;
  return token;
}