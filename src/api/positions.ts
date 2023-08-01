import axios from 'axios';

import { USE_POSITIONS_DATA_SOURCE } from '../constants';
import { API_GetPositionsResponse } from '../types/api';
import { API_Response } from '../types/enso';
import { parseApiErrorOrReturn } from '../utils/parseApiError';

export const getEnsoApiPositions = async (): Promise<API_GetPositionsResponse> => {
  const { data } = await axios.get<API_Response<API_GetPositionsResponse>>(USE_POSITIONS_DATA_SOURCE);

  return parseApiErrorOrReturn(data);
};
