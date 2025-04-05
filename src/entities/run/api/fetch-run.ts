import { runsApi } from '@/shared/api/runs-api';
import { RunDto } from './dto';

export interface FetchRunParams {
  id: number;
}

export function fetchRun({ id }: FetchRunParams): Promise<RunDto> {
  return runsApi.get(`runs/${id}`).json();
}
