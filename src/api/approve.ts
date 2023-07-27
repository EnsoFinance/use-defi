import queryString from 'query-string';

import { ENSO_API } from '../constants';
import { API_AllowancesOptions, API_AllowancesResponse, API_ApproveOptions, API_ApproveResponse } from '../types/api';

export const getEnsoApiApprove = async (options: API_ApproveOptions): Promise<API_ApproveResponse | undefined> => {
  const queryParams = {
    chainId: options.chainId ?? 1,
    fromAddress: options.fromAddress,
    tokenAddress: options.tokenAddress,
    amount: options.amount,
  };

  const response = await fetch(`${ENSO_API}/api/v1/wallet/approve?${queryString.stringify(queryParams)}`);

  const json = (await response.json()) as API_ApproveResponse;

  if (!json.tx) throw new Error('No valid response');
  return json;
};

export const getEnsoApiAllowance = async (
  options: API_AllowancesOptions,
): Promise<API_AllowancesResponse | undefined> => {
  const queryParams = {
    chainId: options.chainId ?? 1,
    fromAddress: options.fromAddress,
  };

  const response = await fetch(`${ENSO_API}/api/v1/wallet/approvals?${queryString.stringify(queryParams)}`);

  const json = (await response.json()) as API_AllowancesResponse;

  if (!Array.isArray(json)) throw new Error('No valid response');
  return json;
};
