import { useMemo } from 'react';
import { useExecuteShortcut, useShortcuts } from 'use-defi';

import { UseExecuteShortcutArgs } from '../../src/hooks/useExecuteShortcut/types';

import './App.css';
import Connect from './Connect';

function App() {
  const tokenIn = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
  const tokenOut = '0x028171bCA77440897B824Ca71D1c56caC55b68A3';
  const protocol = undefined;
  const amount = '10000000000000000';

  const { data } = useShortcuts({
    chain: 1,
    token: tokenOut,
  });

  const shortcutToExecute = useMemo((): UseExecuteShortcutArgs | undefined => {
    if (!data || !data[0]) return undefined;

    return {
      shortcut: data[0],
      tokenIn: tokenIn,
      amountIn: amount,
    };
  }, [data]);

  const { mutate, executionDetails, status: executeShortcutStatus } = useExecuteShortcut(shortcutToExecute);

  return (
    <div>
      <h1>
        <code>use-defi</code>
        <br />
        React Hooks Playground
      </h1>

      {shortcutToExecute ? (
        <>
          <p>
            Found a Shortcut to run: <code>{shortcutToExecute.shortcut?.token?.symbol ?? ''}</code>
          </p>
        </>
      ) : (
        <>
          No shortcut found for
          <br />
          <code>
            {tokenIn} {'->'} {tokenOut}
          </code>
        </>
      )}
      {executionDetails ? (
        <>
          <p>Route found for shortcut. Click to run</p>
          <button onClick={() => mutate()}>Run Transaction</button>
        </>
      ) : (
        <>Finding route: {executeShortcutStatus}</>
      )}
      <br />
      <Connect />
    </div>
  );
}

export default App;
