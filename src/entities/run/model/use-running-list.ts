import { useRouter } from 'next/router';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { runQueries } from '../api/run-queries';

export function useRunningList() {
  const router = useRouter();

  const {
    data: runs,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery(runQueries.infinite(router.query));

  return {
    runs,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
}
