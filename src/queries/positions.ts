import { USE_POSITIONS_DATA_SOURCE } from 'src/constants';
import { Position } from 'src/types/api';

export type QueryMetaPositionsArgs = Record<never, never>;
export type QueryPositionsResponse = Position[];

export const queryPositions = async (): Promise<QueryPositionsResponse> => {
  const response = await fetch(USE_POSITIONS_DATA_SOURCE);

  const json = (await response.json()) as QueryPositionsResponse;

  if (!Array.isArray(json)) throw new Error('No valid response');
  return json;
};
