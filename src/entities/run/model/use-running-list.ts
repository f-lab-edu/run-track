import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { runQueries } from '../api/run-queries';

export function useRunningList() {
  const {
    data: runs,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery(runQueries.infinite());

  return {
    runs,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
}
