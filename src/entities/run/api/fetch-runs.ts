import { isNotNil } from 'es-toolkit';
import { runsApi } from '@/shared/api/runs-api';
import { RunsResponse } from './response';

export interface FetchRunsParams {
  cursor?: number;
  limit?: number;
}

export function fetchRuns({ cursor, limit }: FetchRunsParams): Promise<RunsResponse> {
  const searchParams = new URLSearchParams();
  if (isNotNil(cursor)) searchParams.set('cursor', cursor.toString());
  if (isNotNil(limit)) searchParams.set('limit', limit.toString());

  return runsApi.get('runs', { searchParams }).json();
}
