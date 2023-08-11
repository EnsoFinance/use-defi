import axios from 'axios';

import { ENSO_API } from '../constants';
import { API_CrossChainOptions, API_CrossChainResponse } from '../types/api';
import { API_Response } from '../types/enso';
import { parseApiErrorOrReturn } from '../utils/parseApiError';

export const getEnsoApiCrossChainRoute = async (
  options: API_CrossChainOptions,
): Promise<API_CrossChainResponse | undefined> => {
  const { data } = await axios.post<API_Response<API_CrossChainResponse>>(
    `${ENSO_API}/api/experimental/multichain/shortcut/route/${options.sourceChainId}/${options.destinationChainId}/${options.fromAddress}`,
    JSON.stringify({
      tokenIn: options.tokenIn,
      tokenOut: options.tokenOut,
      amountIn: options.amountIn,
      slippage: options.slippage,
    }),
    {
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return parseApiErrorOrReturn(data);
};
