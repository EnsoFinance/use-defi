import { API_CrossChainOptions, API_CrossChainResponse } from '../types/api';
import { apiFetchPost } from '../utils/fetch';

export const getEnsoApiCrossChainRoute = async (
  options: API_CrossChainOptions,
): Promise<API_CrossChainResponse | undefined> => {
  return apiFetchPost<API_CrossChainResponse>(
    `api/experimental/multichain/shortcut/route/${options.sourceChainId}/${options.destinationChainId}/${options.fromAddress}`,
    {
      tokenIn: options.tokenIn,
      tokenOut: options.tokenOut,
      amountIn: options.amountIn,
      slippage: options.slippage,
    },
    undefined,
    options.apiKey,
  );
};
