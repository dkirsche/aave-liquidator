import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk'
import { setGlobals } from './globals';
import { liquidate } from './liquidation/liquidation';
import { getGas,gas_cost } from './utils/gas'
import { fetchV2UnhealthyLoans } from './v2liquidation';
require('isomorphic-fetch');

require('dotenv').config()

setGlobals();

const collateralAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
const reserveAddress = "0xb36938c51c4f67e5e1112eb11916ed70a772bd75"
const userLiquidated = "0x922257aefb9d47bfe36e7d72288c2cfb56457a40"
const purchaseAmount = '10'
const receiveATokens = false

//Uniswap constants
const USDC_MAINNET = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6)
const DAI_MAINNET = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)
const USDC_KOVAN = new Token(ChainId.KOVAN, '0xe22da380ee6B445bb8273C81944ADEB6E8450422', 6)
const DAI_KOVAN = new Token(ChainId.KOVAN, '0xff795577d9ac8bd7d90ee22b6c1703490b6512fd', 18)
var DAI_WETH;

const GAS_USED_ESTIMATE = 1000000
//-----
/*
liquidate(
    collateralAddress,
    reserveAddress,
    userLiquidated,
    purchaseAmount,
    receiveATokens
)
*/
delayedFetchUnhealthyLoans();

//infinite loop calling fetchUnhealthyLoans
//sleep for 1 minute before each call
async function delayedFetchUnhealthyLoans(){
  while(1==1){
    console.log(`gas cost ${gas_cost}`)
    console.log("fetching loans")
    //fetchV2UnhealthyLoans();
    //updateSwapPrices();
    getGas();
    await sleep(60000);
  }
}
//fetch all users that have borrowed funds
//calculate HealthFactor
//output all users with Loans that can be liquidated
async function fetchUnhealthyLoans(){
var count=0;
while(count<6){
  fetch('https://api.thegraph.com/subgraphs/name/aave/protocol-multy-raw', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `
      query GET_LOANS {
        users(first:1000, skip:${1000*count}, orderBy: id, orderDirection: desc, where: {borrowedReservesCount_gt: 0}) {
          id
          borrowedReservesCount
          collateralReserve:reserves(where: {principalATokenBalance_gt: 0}) {
            principalATokenBalance
            principalBorrows
            reserve{
              usageAsCollateralEnabled
              reserveLiquidationThreshold
              reserveLiquidationBonus
              borrowingEnabled
              utilizationRate
              symbol
              underlyingAsset
              price {
                priceInEth
              }
              decimals
            }
          }
          borrowReserve: reserves(where: {principalBorrows_gt: 0}) {
            principalATokenBalance
            principalBorrows
            reserve{
              usageAsCollateralEnabled
              reserveLiquidationThreshold
              borrowingEnabled
              utilizationRate
              symbol
              underlyingAsset
              price {
                priceInEth
              }
              decimals
            }
          }
        }
      }`
    }),
  })
  .then(res => res.json())
  .then(res => parseUsers(res.data));
  count++;
  }
}

function parseUsers(payload) {
  console.log(`Records:${payload.users.length} ${Date().toLocaleString()}`)
  payload.users.forEach((user, i) => {
    var totalBorrowed=0;
    var totalCollateral=0;
    var totalCollateralThreshold=0;
    var borrowedSymbol;
    var collateralSymbol;
    user.borrowReserve.forEach((borrowReserve, i) => {
      borrowedSymbol = borrowReserve.reserve.symbol
      var priceInEth= borrowReserve.reserve.price.priceInEth / (10**18)
      var principalBorrowed = borrowReserve.principalBorrows / (10**borrowReserve.reserve.decimals)
      totalBorrowed += priceInEth * principalBorrowed
    });
    user.collateralReserve.forEach((collateralReserve, i) => {
      collateralSymbol = collateralReserve.reserve.symbol
      var priceInEth= collateralReserve.reserve.price.priceInEth / (10**18)
      var principalATokenBalance = collateralReserve.principalATokenBalance / (10**collateralReserve.reserve.decimals)
      totalCollateral += priceInEth * principalATokenBalance
      totalCollateralThreshold += priceInEth * principalATokenBalance * (collateralReserve.reserve.reserveLiquidationThreshold/100)
    });
    var healthFactor= totalCollateralThreshold / totalBorrowed;
    if (healthFactor<=1 && totalCollateral>1)
      console.log(`user_ID:${user.id} HealthFactor ${healthFactor} totalCollateral ${totalCollateral} ${collateralSymbol}->${borrowedSymbol}` )
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateSwapPrices(){
  const pair = await Fetcher.fetchPairData(DAI_KOVAN, WETH[DAI_KOVAN.chainId])

  const route = new Route([pair], WETH[DAI_KOVAN.chainId])
  DAI_WETH = route.midPrice.toSignificant(6)
  console.log(`${DAI_WETH} DAI per WETH`) // 201.306
  console.log(route.midPrice.invert().toSignificant(6)) // 0.00496756
}
