"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAbiReserve = exports.convertUnits = void 0;

/**
 * Function to convert units with 18 decimals
 * @param {Amount to convert} amount 
 */
var convertUnits = function convertUnits(amount) {
  return amount / 1e18;
};

exports.convertUnits = convertUnits;

var getAbiReserve = function getAbiReserve(reserves, reserve) {
  return reserves.filter(function (element) {
    return element['id'] == reserve;
  })[0].abi;
};

exports.getAbiReserve = getAbiReserve;