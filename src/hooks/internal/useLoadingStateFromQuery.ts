import { useMemo } from 'react';
import { LoadingState } from 'src/types';

export interface UseLoadingStateFromQueryArgs {
  data: unknown | undefined;
  error: unknown | undefined;
  isLoading: boolean;
}

export const useLoadingStateFromQuery = ({ data, error, isLoading }: UseLoadingStateFromQueryArgs): LoadingState => {
  const loadingState = useMemo((): LoadingState => {
    if (data && !error) {
      return 'success';
    } else if (isLoading) {
      return 'loading';
    } else if (error) {
      return 'error';
    }

    return 'idle';
  }, [isLoading, data, error]);

  return loadingState;
};
