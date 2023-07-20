interface LoadingGuardProps {
  isLoading: boolean;
  children: React.ReactNode | null;
}

function LoadingGuard({ isLoading, children }: LoadingGuardProps) {
  return <>{isLoading ? 'Loading...' : children}</>;
}

export default LoadingGuard;
