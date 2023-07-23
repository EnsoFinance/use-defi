import { useMemo } from 'react';
import { useExecutePosition, usePositions } from 'use-defi';
import { parseUnits } from 'viem';

import { UseExecutePositionArgs } from '../../src/hooks/useExecutePosition/types';

import './App.css';
import Connect from './Connect';
import LoadingGuard from './LoadingGuard';

function App() {
  const tokenIn = '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643';
  const tokenOut = '0x6b175474e89094c44da98b954eedeac495271d0f';
  const protocol = undefined;
  const amount = parseUnits('1', 8);

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
    executeApprovalsOrTransfers,
    executionDetails,
    status: executeShortcutStatus,
  } = useExecutePosition(executeOptions);

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
          <>
            <div className="code-block">Route found for shortcut. Click to run</div>
            <div>
              {!!executionDetails?.approvals?.length && (
                <button onClick={executeApprovalsOrTransfers}>Run Approvals</button>
              )}
              <button onClick={executeRoute}>Run Transaction</button>
              <br />
            </div>
          </>
        ) : null}
      </LoadingGuard>
      <br />
      <Connect />
    </div>
  );
}

export default App;
