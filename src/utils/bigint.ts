import { BigNumberish } from 'src/types';

export const manyBigIntParseToString = (bigints: BigNumberish[]) => {
  return bigints.map((bigintish) => BigInt(bigintish).toString(10));
};
