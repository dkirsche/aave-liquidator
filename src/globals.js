"use strict";
exports.__esModule = true;
exports.setGlobals = void 0;
var web3_1 = require("web3");
var setGlobals = function () {
    global.web3 = new web3_1["default"](new web3_1["default"].providers.HttpProvider("https://ropsten.infura.io/v3/" + process.env.INFURA_KEY));
    global.fromAccount = process.env.FROM_ACCOUNT;
    global.privateKey = process.env.PRIVATE_KEY;
    global.lpAddressProviderAddress = "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728";
};
exports.setGlobals = setGlobals;
