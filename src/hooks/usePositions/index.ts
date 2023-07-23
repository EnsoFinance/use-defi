import { queryPositions } from 'queries/positions';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { PoolPosition, Position } from 'types/api';
import { getTokenAddressFromPosition } from 'utils/position';

import { addressCompare } from '../../utils/address';
import { useLoadingStateFromQuery } from '../internal/useLoadingStateFromQuery';

import { UsePositionsArgs, UsePositionsPayload } from './types';

type FilterType = (row: Position) => boolean;

export const usePositions = (args: UsePositionsArgs): UsePositionsPayload => {
  const { isLoading, error, data } = useQuery('usePositions', queryPositions);

  const loadingState = useLoadingStateFromQuery({ data, error, isLoading });

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
    status: loadingState,
    data: filteredData,
  };
};
