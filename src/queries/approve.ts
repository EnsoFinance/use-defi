import queryString from 'query-string';
import { ENSO_API } from 'src/constants';
import { BigNumberish, EnsoTransaction } from 'src/types';
import { Address } from 'viem';

export type QueryApproveOptions = {
  chainId?: number;
  fromAddress: Address;
  tokenAddress: Address;
  amount: BigNumberish;
};

export type QueryApproveResponse = {
  tx: EnsoTransaction;
  gas: string;
  token: Address;
  amount: string;
  spender: Address;
};

export const queryApprove = async (options: QueryApproveOptions): Promise<QueryApproveResponse | undefined> => {
  const queryParams = {
    chainId: options.chainId ?? 1,
    fromAddress: options.fromAddress,
    tokenAddress: options.tokenAddress,
    amount: options.amount,
  };

  const response = await fetch(`${ENSO_API}/api/v1/wallet/approve?${queryString.stringify(queryParams)}`);

  const json = await response.json();

  if (!json.tx) throw new Error('No valid response');
  return json;
};

export type QueryApprovalsOptions = {
  chainId?: number;
  fromAddress: Address;
};

export type QueryApprovalsResponse = {
  token: Address;
  spender: Address;
  amount: string;
}[];

export const queryApprovals = async (options: QueryApprovalsOptions): Promise<QueryApprovalsResponse | undefined> => {
  const queryParams = {
    chainId: options.chainId ?? 1,
    fromAddress: options.fromAddress,
  };

  const response = await fetch(`${ENSO_API}/api/v1/wallet/approvals?${queryString.stringify(queryParams)}`);

  const json = await response.json();

  if (!Array.isArray(json)) throw new Error('No valid response');
  return json as QueryApprovalsResponse;
};
