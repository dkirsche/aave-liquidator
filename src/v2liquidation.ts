
const minimumCollateralToLiquidate = 0
const healthFactorMax = 1 //liquidation can happen when less than 1
const theGraphURL_kovan = 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2-kovan'
const theGraphURL_mainnet = 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2'
const allowedLiquidation = .5 //50% of a borrowed asset can be liquidated


export const fetchV2UnhealthyLoans = async function fetchV2UnhealthyLoans(){
var count=0;
while(count<6){
  fetch(theGraphURL_kovan, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `
      query GET_LOANS {
        users(first:1000, skip:${1000*count}, orderBy: id, orderDirection: desc, where: {borrowedReservesCount_gt: 0}) {
          id
          borrowedReservesCount
          collateralReserve:reserves(where: {currentATokenBalance_gt: 0}) {
            currentATokenBalance
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
          borrowReserve: reserves(where: {currentTotalDebt_gt: 0}) {
            currentTotalDebt
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
    var max_borrowedSymbol;
    var max_borrowedPrincipal=0;
    var max_collateralSymbol;
    var max_collateralBonus=0;

    user.borrowReserve.forEach((borrowReserve, i) => {
      var priceInEth= borrowReserve.reserve.price.priceInEth / (10**18)
      var principalBorrowed = borrowReserve.currentTotalDebt / (10**borrowReserve.reserve.decimals)
      totalBorrowed += priceInEth * principalBorrowed
      if (principalBorrowed> max_borrowedPrincipal)
        max_borrowedSymbol = borrowReserve.reserve.symbol
        max_borrowedPrincipal = principalBorrowed
    });
    user.collateralReserve.forEach((collateralReserve, i) => {
      var priceInEth= collateralReserve.reserve.price.priceInEth / (10**18)
      var principalATokenBalance = collateralReserve.currentATokenBalance / (10**collateralReserve.reserve.decimals)
      totalCollateral += priceInEth * principalATokenBalance
      totalCollateralThreshold += priceInEth * principalATokenBalance * (collateralReserve.reserve.reserveLiquidationThreshold/10000)
      if (collateralReserve.reserve.reserveLiquidationBonus > max_collateralBonus){
        max_collateralSymbol = collateralReserve.reserve.symbol
        max_collateralBonus=collateralReserve.reserve.reserveLiquidationBonus
      }
    });
    var healthFactor= totalCollateralThreshold / totalBorrowed;
    if (healthFactor<=healthFactorMax && totalCollateral>=minimumCollateralToLiquidate) {
      var profit = max_borrowedPrincipal * allowedLiquidation * (max_collateralBonus/10000 - 1)
      console.log(`user_ID:${user.id} HealthFactor ${healthFactor.toFixed(2)} allowedLiquidation ${(max_borrowedPrincipal*allowedLiquidation).toFixed(2)} ${max_collateralSymbol}->${max_borrowedSymbol} bonus ${profit.toFixed(2)}` )
    }
  });
}
