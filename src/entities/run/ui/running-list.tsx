import { InfiniteScroll } from '@/shared/ui/infinite-scroll';
import { useRunningList } from '../model/use-running-list';
import RunningCard from './running-card';

export default function RunningList() {
  const { runs, hasNextPage, isFetchingNextPage, fetchNextPage } = useRunningList();

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
