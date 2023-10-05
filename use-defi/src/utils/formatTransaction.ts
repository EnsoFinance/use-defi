import { Account, Hash, SendTransactionParameters } from 'viem';
import { Chain } from 'wagmi';

import { Transaction as API_Transaction } from '../types/api';

export const formatTransaction = (
  txLike: API_Transaction,
  chain: Chain,
): SendTransactionParameters<Chain, Account, Chain> => {
  const tx: SendTransactionParameters<Chain, Account, Chain> = {
    chain: chain,
    to: txLike.to as Hash,
    data: txLike.data as Hash,
    value: txLike.value ? BigInt(txLike.value) : BigInt(0),
    account: txLike.from,
  };

  return tx;
};
