import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { runQueries } from '../api/run-queries';
import RunningCard from './running-card';

export default function RunningList() {
  const { data: runs } = useSuspenseInfiniteQuery(runQueries.infinite());

  return (
    <div className="space-y-4">
      {runs.map((run) => (
        <RunningCard
          key={run.id}
          run={run}
        />
      ))}
    </div>
  );
}
