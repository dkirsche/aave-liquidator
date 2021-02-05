import { ChainId, TokenAmount, Pair, Currency, Fetcher } from '@uniswap/sdk'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { Interface } from '@ethersproject/abi'

import { wrappedCurrency } from '../utils/wrappedCurrency'

const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID
}

export async function usePairs(currencies: [Currency | undefined, Currency | undefined][]): Pair[] {
  const chainId  = ChainId.MAINNET

//convert to to wrapped tokens where needed
  const tokens =
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId)
      ])
//convert to pairs and get their reserves
  const reserves = await getReserves(tokens)
  //filter out nulls
  const reserves_cleansed = reserves.filter(result => !!result )
  //console.log(`results ${JSON.stringify(reserves,null,2)}`)
  return reserves_cleansed

// see hooks when implementing this function
  //import { useMultipleContractSingleData } from '../state/multicall/hooks'
  //const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
  //todo call getReserves for all token pairs
  //return [[reserve0,reserve1],key]
  //const results = getReserves(tokens)
/*
  [{
    loading: false,
    result: {
      reserve0:0,
      reserve1:0
    },
  }]

  return reserves.map((pair, i) => {
    console.log(`pair ${JSON.stringify(pair,null,2)}`)
    const { tokenAmounts: reserves, loading } = pair
    const token0 = pair.tokenAmounts[0]
    const token1 = pair.tokenAmounts[1]
    if (!pair) return [PairState.NOT_EXISTS, null]
    if (!token0 || !token1 || token0.equals(token1)) return [PairState.INVALID, null]
    return [
      PairState.EXISTS,
      new Pair(new TokenAmount(token0, token0.reserve0.toString()), new TokenAmount(pair.token1, pair.reserve1.toString()))
    ]
  })
  */
}

export async function usePair(tokenA?: Currency, tokenB?: Currency): Pair[] {
  return usePairs([[tokenA, tokenB]])[0]
}

async function getReserves(tokens:[Token,Token][]): Pair[] {
  const results = await Promise.all(tokens.map(async([tokenA, tokenB]) => {
    if (tokenA && tokenB && tokenA.equals(tokenB)){
      return
    }
    //console.log (`tokenA ${tokenA.symbol} tokenB ${tokenB.symbol}`)
    try {
      const pairDetails = await Fetcher.fetchPairData(tokenA, tokenB)
      return pairDetails
    }
    catch(e){
      }
    }
  )
)
  return results
}
