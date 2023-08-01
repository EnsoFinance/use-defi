import axios from 'axios';
import queryString from 'query-string';

import { ENSO_API } from '../constants';
import { API_AllowancesOptions, API_AllowancesResponse, API_ApproveOptions, API_ApproveResponse } from '../types/api';
import { API_Response } from '../types/enso';
import { parseApiErrorOrReturn } from '../utils/parseApiError';

export const getEnsoApiApprove = async (options: API_ApproveOptions): Promise<API_ApproveResponse | undefined> => {
  const queryParams = {
    chainId: options.chainId ?? 1,
    fromAddress: options.fromAddress,
    tokenAddress: options.tokenAddress,
    amount: options.amount,
  };

  const { data } = await axios.get<API_Response<API_ApproveResponse>>(
    `${ENSO_API}/api/v1/wallet/approve?${queryString.stringify(queryParams)}`,
  );

  return parseApiErrorOrReturn(data);
};

export const getEnsoApiAllowance = async (
  options: API_AllowancesOptions,
): Promise<API_AllowancesResponse | undefined> => {
  const queryParams = {
    chainId: options.chainId ?? 1,
    fromAddress: options.fromAddress,
  };

  const { data } = await axios.get<API_Response<API_AllowancesResponse>>(
    `${ENSO_API}/api/v1/wallet/approvals?${queryString.stringify(queryParams)}`,
  );

  return parseApiErrorOrReturn(data);
};
