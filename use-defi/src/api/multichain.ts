import { ENSO_API } from '../constants';
import { API_CrossChainOptions, API_CrossChainResponse } from '../types/api';
import { parseApiErrorOrReturn } from '../utils/parseApiError';

export const getEnsoApiCrossChainRoute = async (
  options: API_CrossChainOptions,
): Promise<API_CrossChainResponse | undefined> => {
  const response = await fetch(
    `${ENSO_API}/api/experimental/multichain/shortcut/route/${options.sourceChainId}/${options.destinationChainId}/${options.fromAddress}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenIn: options.tokenIn,
        tokenOut: options.tokenOut,
        amountIn: options.amountIn,
        slippage: options.slippage,
      }),
    },
  );
  const data = await response.json();

  return parseApiErrorOrReturn(data);
};
