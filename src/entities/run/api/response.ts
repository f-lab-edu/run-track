import { RunDto } from './dto';

export interface RunsResponse {
  runs: RunDto[];
  nextCursor: number | null;
  hasMore: boolean;
}
