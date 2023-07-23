import { BasePosition, PoolPosition, Position } from 'types/api';

export const getTokenAddressFromPosition = (position: Position) => {
  if ((position as BasePosition).address) return (position as BasePosition).address;

  return (position as PoolPosition).tokenAddress;
};
