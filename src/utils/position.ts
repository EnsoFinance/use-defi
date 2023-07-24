import { BasePosition, PoolPosition, Position } from '../types/api';

export const getTokenAddressFromPosition = (position: Position): string => {
  if ((position as BasePosition).address) return (position as BasePosition).address;

  return (position as PoolPosition).tokenAddress;
};
