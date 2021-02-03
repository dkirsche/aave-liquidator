"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setGlobals = void 0;

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setGlobals = function setGlobals() {
  global.web3 = new _web["default"](new _web["default"].providers.HttpProvider("https://ropsten.infura.io/v3/" + process.env.INFURA_KEY));
  global.fromAccount = process.env.FROM_ACCOUNT;
  global.privateKey = process.env.PRIVATE_KEY;
  global.lpAddressProviderAddress = "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728";
};

exports.setGlobals = setGlobals;