import { useMemo } from 'react';
import { useExecutePosition, usePositions } from 'use-defi';

import { NATIVE_TOKEN_ALIAS } from '../../src/constants';
import { UseExecutePositionArgs } from '../../src/hooks/useExecutePosition/types';

import './App.css';
import Connect from './Connect';
import LoadingGuard from './LoadingGuard';

function App() {
  const tokenIn = NATIVE_TOKEN_ALIAS;
  const tokenOut = '0x6b175474e89094c44da98b954eedeac495271d0f';
  const protocol = undefined;
  const amount = '1000000';

  const { data, status: positionStatus } = usePositions({
    chain: 1,
    token: tokenOut,
  });

  const executeOptions = useMemo((): UseExecutePositionArgs | undefined => {
    if (!data || !data[0]) return undefined;

    return {
      position: data[0],
      tokenIn: tokenIn,
      amountIn: amount,
    };
  }, [data]);

  const {
    executeRoute,
    executePreliminary,
    executionDetails,
    status: executeShortcutStatus,
  } = useExecutePosition(executeOptions);
  console.log(executionDetails);
  const hasPosition = !!executeOptions;
  const hasRoute = !!executionDetails;

  return (
    <div>
      <h2>
        <code>use-defi code playground</code>
      </h2>
      <LoadingGuard isLoading={positionStatus === 'loading'}>
        {hasPosition ? (
          <div className="code-block">{executeOptions.position?.name ?? ''}</div>
        ) : (
          <div className="code-block">
            No shortcut route has been found for {tokenIn} to {tokenOut}
          </div>
        )}
      </LoadingGuard>
      <LoadingGuard isLoading={executeShortcutStatus === 'loading'}>
        {hasRoute ? (
          <div className="code-block">
            <p>Route found for shortcut. Click to run</p>
            {executionDetails.approvals.length && <button onClick={executePreliminary}>Run Approvals</button>}
            <button onClick={executeRoute}>Run Transaction</button>
            <br />
          </div>
        ) : null}
      </LoadingGuard>
      <br />
      <Connect />
    </div>
  );
}

export default App;
