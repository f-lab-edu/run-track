import { useState } from 'react';
import { subDays } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { DateRangePicker, type DateRange } from '@/shared/ui/date-range-picker';
import StatItem from './stat-item';

interface RunStatsCardProps {
  open: boolean;
  onClose?: () => void;
}

const stats = {
  totalDistance: 25.4,
  averageDistance: 5.08,
  totalDuration: 154,
  averagePace: '5:45',
};

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
        <div className="mt-2 grid grid-cols-2 gap-4">
          <StatItem
            title="총 거리"
            value={`${stats.totalDistance} km`}
            className="bg-green-50"
          />
          <StatItem
            title="평균 거리"
            value={`${stats.averageDistance} km`}
            className="bg-blue-50"
          />
          <StatItem
            title="총 시간"
            value={`${Math.floor(stats.totalDuration / 60)}시간 ${stats.totalDuration % 60}분`}
            className="bg-purple-50"
          />
          <StatItem
            title="평균 페이스"
            value={`${stats.averagePace} /km`}
            className="bg-orange-50"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
