import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { InfiniteScroll } from '@/shared/ui/infinite-scroll';
import { runQueries } from '../api/run-queries';
import RunningCard from './running-card';

export default function RunningList() {
  const {
    data: runs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(runQueries.infinite());

  return (
    <div className="space-y-4">
      <InfiniteScroll
        isLoading={isFetchingNextPage}
        hasMore={hasNextPage}
        onLoadMore={fetchNextPage}
      >
        {runs.map((run) => (
          <RunningCard
            key={run.id}
            run={run}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
