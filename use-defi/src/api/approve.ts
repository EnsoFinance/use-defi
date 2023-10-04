import { ENSO_API } from '../constants';
import { API_AllowancesOptions, API_AllowancesResponse, API_ApproveOptions, API_ApproveResponse } from '../types/api';
import { API_Response } from '../types/enso';
import { parseApiErrorOrReturn } from '../utils/parseApiError';

export const getEnsoApiApprove = async (options: API_ApproveOptions): Promise<API_ApproveResponse | undefined> => {
  const queryParams = {
    chainId: String(options.chainId ?? 1),
    fromAddress: options.fromAddress,
    tokenAddress: options.tokenAddress,
    amount: options.amount,
  };

  const response = await fetch(`${ENSO_API}/api/v1/wallet/approve?${new URLSearchParams(queryParams)}`);
  const data = await response.json();

  return parseApiErrorOrReturn(data);
};

export const getEnsoApiAllowance = async (
  options: API_AllowancesOptions,
): Promise<API_AllowancesResponse | undefined> => {
  const queryParams = {
    chainId: String(options.chainId ?? 1),
    fromAddress: options.fromAddress,
  };

  const response = await fetch(`${ENSO_API}/api/v1/wallet/approvals?${new URLSearchParams(queryParams)}`);
  const data = await response.json();

  return parseApiErrorOrReturn(data);
};
