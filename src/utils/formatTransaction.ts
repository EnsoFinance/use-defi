import { Address, Hash, TransactionRequestBase } from 'viem';

import { Transaction as API_Transaction } from '../types/api';

type BaseTransaction = Omit<TransactionRequestBase, 'from'> & {
  from?: Address;
};

export const formatTransaction = (txLike: API_Transaction): BaseTransaction => {
  const tx: BaseTransaction = {
    to: txLike.to as Hash,
    data: txLike.data as Hash,
    value: txLike.value ? BigInt(txLike.value) : BigInt(0),
  };

  if (txLike.from) {
    tx.from = txLike.from;
  }

  return tx;
};
