import { API_AllowancesOptions, API_AllowancesResponse, API_ApproveOptions, API_ApproveResponse } from '../types/api';
import { apiFetchGet } from '../utils/fetch';

export const getEnsoApiApprove = async (options: API_ApproveOptions): Promise<API_ApproveResponse | undefined> => {
  const queryParams = {
    chainId: String(options.chainId ?? 1),
    fromAddress: options.fromAddress,
    tokenAddress: options.tokenAddress,
    amount: options.amount,
  };

  return apiFetchGet<API_ApproveResponse>('api/v1/wallet/approve', queryParams);
};

export const getEnsoApiAllowance = async (
  options: API_AllowancesOptions,
): Promise<API_AllowancesResponse | undefined> => {
  const queryParams = {
    chainId: String(options.chainId ?? 1),
    fromAddress: options.fromAddress,
  };

  return apiFetchGet<API_AllowancesResponse>('api/v1/wallet/approvals', queryParams);
};
