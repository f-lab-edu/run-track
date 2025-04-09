import { useState } from 'react';
import { subDays } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { DateRangePicker, type DateRange } from '@/shared/ui/date-range-picker';
import { QueryBoundary } from '@/shared/ui/query-boundary';
import RunningStats from './running-stats';
import SkeletonStats from './skeleton-stats';

interface RunStatsCardProps {
  open: boolean;
  onClose?: () => void;
}

export default function RunStatsCard({ open, onClose }: RunStatsCardProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">러닝 통계</DialogTitle>
          <div className="mt-2">
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              className="w-full"
            />
          </div>
        </DialogHeader>
        <QueryBoundary pendingFallback={<SkeletonStats />}>
          <RunningStats dateRange={dateRange} />
        </QueryBoundary>
      </DialogContent>
    </Dialog>
  );
}
