"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allowance = exports.getUserBorrowBalances = exports.getUserUnderlyingAssetBalance = exports.getUserReserveData = exports.getUserAccountData = void 0;

/**
 * Returns the Account data of the user
 * @param {Lending pool contract} lpContract 
 * @param {User id to get the data} user 
 */
var getUserAccountData = function getUserAccountData(lpContract, user) {
  return lpContract.methods.getUserAccountData(user).call()["catch"](function (e) {
    throw Error("Error getting user account data: ".concat(e.message));
  });
};
/**
 * 
 * @param {Lending pool contract} lpContract 
 * @param {Token reserve address} reserve 
 * @param {User id to get the data} user 
 */


exports.getUserAccountData = getUserAccountData;

var getUserReserveData = function getUserReserveData(lpContract, reserve, user) {
  return lpContract.methods.getUserReserveData(reserve, user).call()["catch"](function (e) {
    throw Error("Error getting user account data: ".concat(e.message));
  });
};
/**
 * 
 * @param {Lending pool core contract} lpCoreContract 
 * @param {Collateral address} collateral 
 * @param {User id to get the data} user 
 */


exports.getUserReserveData = getUserReserveData;

var getUserUnderlyingAssetBalance = function getUserUnderlyingAssetBalance(lpCoreContract, collateral, user) {
  return lpCoreContract.methods.getUserUnderlyingAssetBalance(collateral, user).call()["catch"](function (e) {
    throw Error("Error getting user account data: ".concat(e.message));
  });
};
/**
 * 
 * @param {Lending pool core contract} lpCoreContract 
 * @param {Collateral address} collateral 
 * @param {User id to get the data} user 
 */


exports.getUserUnderlyingAssetBalance = getUserUnderlyingAssetBalance;

var getUserBorrowBalances = function getUserBorrowBalances(lpCoreContract, collateral, user) {
  return lpCoreContract.methods.getUserBorrowBalances(collateral, user).call()["catch"](function (e) {
    throw Error("Error getting user account data: ".concat(e.message));
  });
};
/**
 * 
 * @param {er20 token contract} erc20Contract 
 * @param {owner address of the token} owner 
 * @param {spender address of the token} spender 
 */


exports.getUserBorrowBalances = getUserBorrowBalances;

var allowance = function allowance(erc20Contract, owner, spender) {
  return erc20Contract.methods.allowance(owner, spender).call()["catch"](function (e) {
    throw Error("Error getting user account data: ".concat(e.message));
  });
};

exports.allowance = allowance;