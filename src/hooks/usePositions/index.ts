import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { getEnsoApiPositions } from '../../api/positions';
import { PoolPosition, Position } from '../../types/api';
import { addressCompare } from '../../utils/address';
import { getTokenAddressFromPosition } from '../../utils/position';

import { UsePositionsArgs, UsePositionsPayload } from './types';

type FilterType = (row: Position) => boolean;

/**
 * Finds available positions on Enso based on specified options.
 *
 * @example const { data: positions } = usePositions({ chain: 1, protocol: 'aave-v2', token: '0xBcca60bB61934080951369a648Fb03DF4F96263C' })
 */

export const usePositions = (args: UsePositionsArgs): UsePositionsPayload => {
  const { status, error, data } = useQuery('usePositions', getEnsoApiPositions);

  const filteredData = useMemo(() => {
    const filters: FilterType[] = [];
    if (args.chain) {
      filters.push((row: Position) => row.chainId === args.chain);
    }
    if (args.protocol) {
      filters.push((row: Position) => {
        if ((row as PoolPosition).project === undefined) return false;
        const pool = row as PoolPosition;

        return pool.project === args.protocol || pool.token?.project === args.protocol;
      });
    }
    if (args.token) {
      filters.push((row: Position) => {
        const positionToken = getTokenAddressFromPosition(row);

        return !!positionToken && addressCompare(positionToken, args.token as string);
      });
    }

    if (data) {
      return data.filter((metaPosition) => filters.every((filter) => filter(metaPosition)));
    }

    return [];
  }, [args.chain, args.protocol, args.token, data]);

  return {
    status,
    error: (error as string).toString(),
    data: filteredData,
  };
};
