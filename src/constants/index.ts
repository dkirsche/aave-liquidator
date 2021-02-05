import { ChainId, JSBI, Percent, Token } from '@uniswap/sdk'

export const TOKEN_LIST =
{
  "DAI" : new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin'),
  "USDC" : new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C'),
  "USDT" : new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD'),
  "COMP" : new Token(ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound'),
  "MKR" : new Token(ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker'),
  "AMPL" : new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth'),
  "WBTC" : new Token(ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC'),
  "AAVE" : new Token(ChainId.MAINNET, '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', 18, 'AAVE', 'AAVE'),
  "BAT" : new Token(ChainId.MAINNET, '0x0D8775F648430679A709E98d2b0Cb6250d2887EF', 18, 'BAT', 'Basic Attention'),
  "BUSD" : new Token(ChainId.MAINNET, '0x4Fabb145d64652a948d72533023f6E7A623C7C53', 18, 'BUSD', 'Binance USD stablecoin'),
  "CRV" : new Token(ChainId.MAINNET, '0xD533a949740bb3306d119CC777fa900bA034cd52', 18, 'CRV', 'Curve'),
  "ENJ" : new Token(ChainId.MAINNET, '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c', 18, 'ENJ', 'Enjin'),
  "GUSD" : new Token(ChainId.MAINNET, '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd', 2, 'GUSD', 'Gemini Dollar'),
  "KNC" : new Token(ChainId.MAINNET, '0xdd974D5C2e2928deA5F71b9825b8b646686BD200', 18, 'KNC', 'KyberNetwork'),
  "LINK" : new Token(ChainId.MAINNET, '0x514910771AF9Ca656af840dff83E8264EcF986CA', 18, 'LINK', 'ChainLink'),
  "MANA" : new Token(ChainId.MAINNET, '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942', 18, 'MANA', 'Decentraland'),
  "REN" : new Token(ChainId.MAINNET, '0x408e41876cCCDC0F92210600ef50372656052a38', 18, 'REN', 'Republic'),
  "SNX" : new Token(ChainId.MAINNET, '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F', 18, 'SNX', 'Synthetix Network'),
  "SUSD" : new Token(ChainId.MAINNET, '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51', 18, 'SUSD', 'Synth sUSD'),
  "TUSD" : new Token(ChainId.MAINNET, '0x0000000000085d4780B73119b644AE5ecd22b376', 18, 'TUSD', 'TrueUSD'),
  "UNI" : new Token(ChainId.MAINNET, '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', 18, 'UNI', 'UniSwap'),
  "WETH" : new Token(ChainId.MAINNET, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'),
  "YFI" : new Token(ChainId.MAINNET, '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18, 'YFI', 'yearn.finance'),
  "ZRX" : new Token(ChainId.MAINNET, '0xE41d2489571d322189246DaFA5ebDe1F4699F498', 18, 'ZRX', '0x'),
  "BAL" : new Token(ChainId.MAINNET, '0xba100000625a3754423978a60c9317c58a424e3D', 18, 'BAL', 'Balancer'),
}

const USDC_KOVAN = new Token(ChainId.KOVAN, '0xe22da380ee6B445bb8273C81944ADEB6E8450422', 6)
const DAI_KOVAN = new Token(ChainId.KOVAN, '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD', 18)
