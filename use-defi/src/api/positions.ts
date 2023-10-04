import { USE_POSITIONS_DATA_SOURCE } from '../constants';
import { API_GetPositionsResponse } from '../types/api';
import { API_Response } from '../types/enso';
import { parseApiErrorOrReturn } from '../utils/parseApiError';

export const getEnsoApiPositions = async (): Promise<API_GetPositionsResponse> => {
  const response = await fetch(USE_POSITIONS_DATA_SOURCE);
  const data = await response.json();

  return parseApiErrorOrReturn(data);
};
