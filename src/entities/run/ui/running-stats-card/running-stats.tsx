import { DateRange } from '@/shared/ui/date-range-picker';
import { useRunningStats } from '../../model/use-running-stats';
import StatItem from './stat-item';

interface RunningStatsProps {
  dateRange?: DateRange;
}

export default function RunningStats({ dateRange }: RunningStatsProps) {
  const stats = useRunningStats({ dateRange });

  return (
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
  );
}
