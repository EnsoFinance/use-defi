import { BasePosition, PoolPosition, Position } from 'src/types';

export const getTokenAddressFromPosition = (position: Position) => {
  if ((position as BasePosition).address) return (position as BasePosition).address;

  return (position as PoolPosition).tokenAddress;
};
