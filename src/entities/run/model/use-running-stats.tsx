import { formatISO } from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DateRange } from '@/shared/ui/date-range-picker';
import { runQueries } from '../api/run-queries';

export interface UseRunningStatsProps {
  dateRange?: DateRange;
}

export function useRunningStats({ dateRange }: UseRunningStatsProps) {
  const startDate = dateRange?.from ? formatISO(dateRange.from, { representation: 'date' }) : undefined;
  const endDate = dateRange?.to ? formatISO(dateRange.to, { representation: 'date' }) : undefined;

  const { data } = useSuspenseQuery(runQueries.stats({ startDate, endDate }));
  return data;
}
