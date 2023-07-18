import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { MetaPosition } from 'src/types';

import { addressCompare } from '../../utils/address';
import { queryShortcuts } from '../../utils/queries';
import { useLoadingStateFromQuery } from '../internal/useLoadingStateFromQuery';

import { UseShortcutArgs, UseShortcutPayload } from './types';

type FilterType = (row: MetaPosition) => boolean;

export const useShortcuts = (args: UseShortcutArgs): UseShortcutPayload => {
  const { isLoading, error, data } = useQuery('useShortcuts', queryShortcuts);

  const loadingState = useLoadingStateFromQuery({ data, error, isLoading });

  const filteredData = useMemo(() => {
    let filters: FilterType[] = [];
    if (args.chain) {
      filters.push((row: MetaPosition) => row.chainId === args.chain);
    }
    if (args.protocol) {
      filters.push((row: MetaPosition) => row.project === args.protocol || row.token?.project === args.protocol);
    }
    if (args.token) {
      filters.push(
        (row: MetaPosition) => !!(row.tokenAddress && addressCompare(row.tokenAddress, args.token as string)),
      );
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
