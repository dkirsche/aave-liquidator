import "core-js/stable";
import "regenerator-runtime/runtime";
import { ChainId, Token, WETH, Fetcher, Route, TokenAmount } from '@uniswap/sdk'
import { useAllCommonPairs, useTradeExactIn } from './uniswap/trades.ts';
import { setGlobals } from './globals';

import { liquidate } from './liquidation/liquidation';
import { getGas,gas_cost } from './utils/gas'
import { fetchV2UnhealthyLoans } from './v2liquidation';
require('isomorphic-fetch');

/*
This is a place holder for implementing the liquidation call which would fully automate this bot
require('dotenv').config()

setGlobals();
liquidate(
  assetToLiquidate, //the token address of the asset that will be liquidated
  flashAmt, //flash loan amount (number of tokens) which is exactly the amount that will be liquidated
  collateral, //the token address of the collateral. This is the token that will be received after liquidating loans
  userToLiquidate, //user ID of the loan that will be liquidated
  amountOutMin, //when using uniswap this is used to make sure the swap returns a minimum number of tokens, or will revert
  swapPath, //the path that uniswap will use to swap tokens back to original tokens
)
*/
delayedFetchUnhealthyLoans();

//infinite loop calling fetchUnhealthyLoans
//sleep for 1 minute before each call
async function delayedFetchUnhealthyLoans(){
  //var fromTokenAmount = new TokenAmount(TOKEN_LIST["WBTC"], 1000)// this is the number of coins to trade (should have many 0's)
  //console.log (JSON.stringify(useTradeExactIn(fromTokenAmount,TOKEN_LIST["ZRX"]), null, 2))
  //fetchV2UnhealthyLoans("0xfe206f90c58feb8e42474c5074de43c22da8bc35");
  while(1==1){
    console.log(`gas cost ${gas_cost}`)
    console.log("fetching loans")

    fetchV2UnhealthyLoans();
    getGas();
    await sleep(60000);
  }
  //TODO calculate liquidation threshold daily

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
