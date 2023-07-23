import { USE_POSITIONS_DATA_SOURCE } from 'src/constants';
import { BasePosition, PoolPosition } from 'src/types';

export type QueryMetaPositionsArgs = {};
export type QueryMetaPositionsResponse = (BasePosition | PoolPosition)[];

export const queryPositions = async (): Promise<QueryMetaPositionsResponse> => {
  const response = await fetch(USE_POSITIONS_DATA_SOURCE);

  const json = await response.json();

  if (!Array.isArray(json)) throw new Error('No valid response');
  return json as QueryMetaPositionsResponse;
};
