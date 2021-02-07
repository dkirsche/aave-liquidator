import { isTradeBetter } from './utils/trades'
import { ChainId, Currency, CurrencyAmount, Pair, Token, Trade } from '@uniswap/sdk'
import flatMap from 'lodash.flatmap'

import { BASES_TO_CHECK_TRADES_AGAINST, CUSTOM_BASES, BETTER_TRADE_LESS_HOPS_THRESHOLD } from './constants'
import { PairState, usePairs } from './data/Reserves'
import { wrappedCurrency } from './utils/wrappedCurrency'

//import { useUnsupportedTokens } from './Tokens'

export async function useAllCommonPairs(token1?: Token, token2?: Token): Pair[] {
  const chainId = token1.chainId && token2.chainId  && token1.chainId == token2.chainId ? token1.chainId : undefined

  const bases: Token[] = chainId ? BASES_TO_CHECK_TRADES_AGAINST[chainId] : []

  const [tokenA, tokenB] = chainId
    ? [wrappedCurrency(token1), wrappedCurrency(token2)]
    : [undefined, undefined]

  const basePairs: [Token, Token][] =
      flatMap(bases, (base): [Token, Token][] => bases.map(otherBase => [base, otherBase])).filter(
        ([t0, t1]) => t0.address !== t1.address
      )
  const allPairCombinations: [Token, Token][] =
    tokenA && tokenB
      ? [
          // the direct pair
          [tokenA, tokenB],
          // token A against all bases
          ...bases.map((base): [Token, Token] => [tokenA, base]),
          // token B against all bases
          ...bases.map((base): [Token, Token] => [tokenB, base]),
          // each base against all bases
          ...basePairs
        ]
          .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
          .filter(([t0, t1]) => t0.address !== t1.address)
          .filter(([tokenA, tokenB]) => {
            if (!chainId) return true
            const customBases = CUSTOM_BASES[chainId]
            if (!customBases) return true

            const customBasesA: Token[] | undefined = customBases[tokenA.address]
            const customBasesB: Token[] | undefined = customBases[tokenB.address]

            if (!customBasesA && !customBasesB) return true

            if (customBasesA && !customBasesA.find(base => tokenB.equals(base))) return false
            if (customBasesB && !customBasesB.find(base => tokenA.equals(base))) return false

            return true
          })
      : []

  const allPairs = await usePairs(allPairCombinations)

  // only pass along valid pairs, non-duplicated pairs
  return Object.values(
      allPairs
        // filter out duplicated pairs
        .reduce<{ [pairAddress: string]: Pair }>((memo, curr) => {
          memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr
          return memo
        }, {})
    )
}

const MAX_HOPS = 3

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
export async function useTradeExactIn(tokenAmountIn?: TokenAmount, tokenOut?: Token): Trade | null {
  const allowedPairs = await useAllCommonPairs(tokenAmountIn?.currency, tokenOut)
  //console.log(`allowed pairs ${JSON.stringify(allowedPairs,null,2)}`)

  const singleHopOnly = false
  if (tokenAmountIn && tokenOut && allowedPairs.length > 0) {
    if (singleHopOnly) {
      return (
        Trade.bestTradeExactIn(allowedPairs, tokenAmountIn, tokenOut, { maxHops: 1, maxNumResults: 1 })[0] ??
        null
      )
    }
    // search through trades with varying hops, find best trade out of them
    let bestTradeSoFar: Trade | null = null
    for (let i = 1; i <= MAX_HOPS; i++) {
      const currentTrade: Trade | null =
        Trade.bestTradeExactIn(allowedPairs, tokenAmountIn, tokenOut, { maxHops: i, maxNumResults: 1 })[0] ??
        null
      // if current trade is best yet, save it
      if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
        bestTradeSoFar = currentTrade
      }
    }
    //console.log(`bestTradeSoFar ${JSON.stringify(bestTradeSoFar,null,2)}`)
    //console.log(`inputAmount ${bestTradeSoFar.inputAmount.toSignificant(8)}`)
    //console.log(`outputAmount ${bestTradeSoFar.outputAmount.toSignificant(8)}`)
    //console.log(`executionPrice ${bestTradeSoFar.executionPrice.toSignificant(8)}`)
    return bestTradeSoFar
  }
  return null
}

/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export function useTradeExactOut(tokenIn?: Token, tokenAmountOut?: TokenAmount): Trade | null {
  const allowedPairs = useAllCommonPairs(tokenIn, tokenAmountOut?.currency)

  const singleHopOnly = false

    if (tokenIn && tokenAmountOut && allowedPairs.length > 0) {
      if (singleHopOnly) {
        return (
          Trade.bestTradeExactOut(allowedPairs, tokenIn, tokenAmountOut, { maxHops: 1, maxNumResults: 1 })[0] ??
          null
        )
      }
      // search through trades with varying hops, find best trade out of them
      let bestTradeSoFar: Trade | null = null
      for (let i = 1; i <= MAX_HOPS; i++) {
        const currentTrade =
          Trade.bestTradeExactOut(allowedPairs, tokenIn, tokenAmountOut, { maxHops: i, maxNumResults: 1 })[0] ??
          null
        if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
          bestTradeSoFar = currentTrade
        }
      }
      return bestTradeSoFar
    }
    return null
}
//given a path, calculate swap price
//todo this function needs to be completed or deleted. Not currently funcioning right
/*
async function updateSwapPrices(){
  const pair = await Fetcher.fetchPairData(DAI_KOVAN, WETH[DAI_KOVAN.chainId])
  var DAI_WETH;
  const route = new Route([pair], WETH[DAI_KOVAN.chainId])
  DAI_WETH = route.midPrice.toSignificant(6)
  console.log(`${DAI_WETH} DAI per WETH`) // 201.306
  console.log(route.midPrice.invert().toSignificant(6)) // 0.00496756
}
*/
