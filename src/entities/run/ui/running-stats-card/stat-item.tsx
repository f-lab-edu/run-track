import { memo } from 'react';
import { cn } from '@/shared/lib/tw-utils';

interface StatItemProps {
  title: string;
  value: string;
  className?: string;
}

function StatItem({ title, value, className }: StatItemProps) {
  return (
    <div className={cn('rounded-lg p-4', className)}>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default memo(StatItem);
