import queryString from 'query-string';
import { QueryAllowancesOptions, QueryAllowancesResponse, QueryApproveOptions, QueryApproveResponse } from 'types/api';

import { ENSO_API } from '../constants';

export const queryApprove = async (options: QueryApproveOptions): Promise<QueryApproveResponse | undefined> => {
  const queryParams = {
    chainId: options.chainId ?? 1,
    fromAddress: options.fromAddress,
    tokenAddress: options.tokenAddress,
    amount: options.amount,
  };

  const response = await fetch(`${ENSO_API}/api/v1/wallet/approve?${queryString.stringify(queryParams)}`);

  const json = (await response.json()) as QueryApproveResponse;

  if (!json.tx) throw new Error('No valid response');
  return json;
};

export const queryApprovals = async (options: QueryAllowancesOptions): Promise<QueryAllowancesResponse | undefined> => {
  const queryParams = {
    chainId: options.chainId ?? 1,
    fromAddress: options.fromAddress,
  };

  const response = await fetch(`${ENSO_API}/api/v1/wallet/approvals?${queryString.stringify(queryParams)}`);

  const json = await response.json();

  if (!Array.isArray(json)) throw new Error('No valid response');
  return json as QueryAllowancesResponse;
};
