import { useCrossChainRoute, useExecutePosition, usePositions } from '@ensofinance/use-defi';
import { parseUnits } from 'viem';

import './App.css';
import Connect from './Connect';
import LoadingGuard from './LoadingGuard';

function App() {
  const tokenIn = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
  const tokenOut = '0x6b175474e89094c44da98b954eedeac495271d0f';
  // const protocol = undefined;
  const amount = parseUnits('0.001', 18);

  const { data: positions, status: positionStatus } = usePositions({
    chain: 1,
    token: tokenOut,
  });

  // if (positions) console.log(positions[0]);

  const {
    executeRoute,
    executeApprovalsOrTransfers,
    executionDetails,
    errorMessage,
    status: executePositionStatus,
  } = useExecutePosition({
    position: positions ? positions[0] : undefined,
    tokenIn: tokenIn,
    amountIn: amount,
    options: {
      transferMethod: 'NONE',
    },
  });

  const { execute: executeMultichainRoute } = useCrossChainRoute({
    tokenIn,
    tokenOut: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    destinationChainId: 1,
    sourceChainId: 42161,
    amountIn: amount,
  });

  const hasRoute = !!executionDetails;

  return (
    <div>
      <h2>
        <code>use-defi code playground</code>
      </h2>
      <LoadingGuard isLoading={positionStatus === 'loading'}>
        {positions && positions[0] ? (
          <div className="code-block">{positions[0].name ?? ''}</div>
        ) : (
          <div className="code-block">
            Position no found for {tokenIn} to {tokenOut}
          </div>
        )}
      </LoadingGuard>
      <button onClick={() => executeMultichainRoute}>Execute Multichain Route</button>
      <LoadingGuard isLoading={executePositionStatus === 'loading'}>
        {hasRoute ? (
          <>
            <div className="code-block">Route found for shortcut. Click to run</div>
            <div>
              {!!executionDetails?.approvals?.length && (
                <button onClick={() => executeApprovalsOrTransfers}>Run Approvals</button>
              )}
              <button onClick={() => executeRoute}>Run Transaction</button>
              <br />
            </div>
          </>
        ) : executePositionStatus !== 'loading' ? (
          errorMessage
        ) : null}
      </LoadingGuard>
      <br />
      <Connect />
    </div>
  );
}

export default App;
