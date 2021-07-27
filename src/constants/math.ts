import BN from "bn.js";

export const TEN = new BN(10);
export const HALF_WAD = TEN.pow(new BN(18));
export const WAD = TEN.pow(new BN(18));
export const RAY = TEN.pow(new BN(27));
export const ZERO = new BN(0);
export const LAMPORTS_PER_SOL = 1000000000;
export const LAMPORTS_PER_USDT = 1000000;
export const LAMPORTS_PER_HP = 1000000;
export const MS_IN_DAY = 86400000;

export const americanToDecimal = (americanOdds: number): number => {
  if (americanOdds > 0) {
    return 1 + (americanOdds / 100);
  } else if (americanOdds <= 0) {
    return 1 - (100 / americanOdds);
  }
  return NaN;
}

export const decimalToAmerican = (decimalOdds: number): number => {
  if (decimalOdds >= 2) {
    return (decimalOdds - 1) * 100
  } else if (decimalOdds < 2) {
    return -100 / (decimalOdds - 1)
  }
  return NaN;
}

export const tokenAmountToString = (tokenAmount: number, decimals: number = 6, fractionDigits = 6): string => {
  return (tokenAmount / Math.pow(10, decimals)).toLocaleString(undefined, { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })
}