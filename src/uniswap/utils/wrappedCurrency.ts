import { ChainId, Currency, CurrencyAmount, ETHER, Token, TokenAmount, WETH } from '@uniswap/sdk'

export function wrappedCurrency(token: Token | undefined, chainId: ChainId | undefined): Token | undefined {
  return chainId && token === ETHER ? WETH[chainId] : token
}

export function wrappedCurrencyAmount(
  tokenAmount: TokenAmount | undefined,
): TokenAmount | undefined {

  const token = tokenAmount && tokenAmount.chainId ? wrappedCurrency(tokenAmount.token, tokenAmount.chainId) : undefined
  return token && tokenAmount ? new TokenAmount(token, tokenAmount.raw) : undefined
}

export function unwrappedToken(token: Token): Currency {
  if (token.equals(WETH[token.chainId])) return ETHER
  return token
}
