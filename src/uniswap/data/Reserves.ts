import { ChainId, TokenAmount, Pair, Currency } from '@uniswap/sdk'
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

export function usePairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, Pair | null][] {
  const chainId  = ChainId.MAINNET

  const tokens =
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId)
      ])


  const pairAddresses =
      tokens.map(([tokenA, tokenB]) => {
          return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
        })


  // see hooks when implementing this function
  //import { useMultipleContractSingleData } from '../state/multicall/hooks'
  //const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
  //todo call getReserves for all token pairs
  //return [[reserve0,reserve1],key]
  const results =
  [{
    loading: false,
    result: {
      reserve0:100,
      reserve1:100
    },
  }]

  return results.map((result, i) => {
    const { result: reserves, loading } = result
    const tokenA = tokens[i][0]
    const tokenB = tokens[i][1]

    if (loading) return [PairState.LOADING, null]
    if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
    if (!reserves) return [PairState.NOT_EXISTS, null]
    const { reserve0, reserve1 } = reserves
    const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
    return [
      PairState.EXISTS,
      new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString()))
    ]
  })
}

export function usePair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  return usePairs([[tokenA, tokenB]])[0]
}
