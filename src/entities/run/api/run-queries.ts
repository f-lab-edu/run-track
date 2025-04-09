import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { fetchRuns } from './fetch-runs';
import { fetchRun } from './fetch-run';

export const runQueries = {
  all: () => ['runs'],
  infinite: () =>
    infiniteQueryOptions({
      queryKey: [...runQueries.all(), 'infinite'],
      queryFn: ({ pageParam }) =>
        fetchRuns({
          cursor: pageParam,
          limit: 10,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasMore) return null;
        return lastPage.nextCursor;
      },
      select: (data) => data.pages.flatMap((page) => page.runs),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: [...runQueries.all(), id],
      queryFn: () => fetchRun({ id }),
    }),
};
