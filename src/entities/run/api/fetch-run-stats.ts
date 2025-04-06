import { isNotNil } from 'es-toolkit';
import { runsApi } from '@/shared/api/runs-api';
import { RunStatsDto } from './dto';

export interface FetchRunStatsParams {
  startDate?: string;
  endDate?: string;
}

export function fetchRunStats({ startDate, endDate }: FetchRunStatsParams): Promise<RunStatsDto> {
  const searchParams = new URLSearchParams();
  if (isNotNil(startDate)) searchParams.set('startDate', startDate);
  if (isNotNil(endDate)) searchParams.set('endDate', endDate);

  return runsApi.get('runs/stats', { searchParams }).json();
}
