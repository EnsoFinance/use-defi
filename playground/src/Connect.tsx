import { useAccount, useConnect, useDisconnect } from 'wagmi';

function Connect() {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      {isConnected && (
        <div>
          Connected to {activeConnector?.name} - {address}
        </div>
      )}

      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => (isConnected ? disconnect() : connect({ connector }))}
        >
          {connector.name}
          {isLoading && pendingConnector?.id === connector.id && ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </>
  );
}

export default Connect;
