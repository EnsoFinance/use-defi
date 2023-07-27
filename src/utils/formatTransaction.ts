import { Hash, TransactionRequestBase } from 'viem';

import { Transaction as API_Transaction } from '../types/api';

export const formatTransaction = (txLike: API_Transaction): Omit<TransactionRequestBase, 'from'> => ({
  to: txLike.to as Hash,
  data: txLike.data as Hash,
  value: txLike.value ? BigInt(txLike.value) : BigInt(0),
});
