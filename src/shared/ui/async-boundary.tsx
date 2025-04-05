import { Suspense, SuspenseProps } from 'react';
import { ErrorBoundary, ErrorBoundaryPropsWithRender } from 'react-error-boundary';
import { AlertCircle } from 'lucide-react';
import { Button } from './button';
import { Spinner } from './spinner';

function Loading() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center">
      <Spinner />
    </div>
  );
}

interface RejectedProps {
  error: unknown;
  onReset: () => void;
}

function Rejected({ error, onReset }: RejectedProps) {
  const message = error instanceof Error ? error.message : '오류가 발생했습니다.';

  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center">
      <AlertCircle className="mb-4 size-12 text-red-500" />
      <p className="mb-4 text-xl font-semibold text-red-500">{message}</p>
      <Button onClick={onReset}>재시도</Button>
    </div>
  );
}

export interface AsyncBoundaryProps extends Omit<ErrorBoundaryPropsWithRender, 'fallbackRender'> {
  pendingFallback?: SuspenseProps['fallback'];
  rejectedFallback?: ErrorBoundaryPropsWithRender['fallbackRender'];
}

export function AsyncBoundary({
  pendingFallback = <Loading />,
  rejectedFallback = ({ error, resetErrorBoundary }) => (
    <Rejected
      error={error}
      onReset={resetErrorBoundary}
    />
  ),
  children,
  ...errorBoundaryProps
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={rejectedFallback}
      {...errorBoundaryProps}
    >
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
