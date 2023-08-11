export type LoadingState = 'loading' | 'error' | 'success' | 'idle';

export type TransferMethods = 'APPROVE_TRANSFERFROM' | 'TRANSFER' | 'PERMIT2' | 'NONE';

export type BigNumberish = bigint | number | string;

export type API_Error = {
  statusCode: number;
  message: string;
  error?: string;
};
export type API_Response<SuccessResponse> = SuccessResponse | API_Error;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransactionFunc = () => Promise<any> | void;
