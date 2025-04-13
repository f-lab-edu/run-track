import { isNotNil } from 'es-toolkit';
import { runsApi } from '@/shared/api/runs-api';
import { RunsResponse } from './response';

export interface FetchRunsFilters {
  minDistance?: number;
  maxDistance?: number;
  minDuration?: number;
  maxDuration?: number;
  minPace?: number;
  maxPace?: number;
}

export interface FetchRunsParams extends FetchRunsFilters {
  cursor?: number;
  limit?: number;
}

export function fetchRuns(params: FetchRunsParams): Promise<RunsResponse> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (isNotNil(value)) searchParams.set(key, value.toString());
  });

  return runsApi.get('runs', { searchParams }).json();
}
