import { BigNumberish } from 'types/enso';

export const manyBigIntParseToString = (bigints: BigNumberish[]) => {
  return bigints.map((bigintish) => BigInt(bigintish).toString(10));
};
