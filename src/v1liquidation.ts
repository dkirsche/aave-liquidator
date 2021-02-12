//fetch all users that have borrowed funds
//calculate HealthFactor
//output all users with Loans that can be liquidated

//NEEDS CLEAN UP TO FUNCTION PROPERLY
//v2liquidation has been updated, this code needs to be updated to function similarly to v2.
//the query is correct, but parseUsers() needs updating & liquidationProfits() needs to be added.

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
