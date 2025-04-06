import { memo } from 'react';
import { Skeleton } from '@/shared/ui/skeleton';

function SkeletonStats() {
  return (
    <div className="mt-2 grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-lg bg-gray-50 p-4"
        >
          <Skeleton className="mb-2 h-4 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
}

export default memo(SkeletonStats);
