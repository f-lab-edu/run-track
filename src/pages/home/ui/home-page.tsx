import { dehydrate, DehydratedState, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { QueryBoundary } from '@/shared/ui/query-boundary';
import { runQueries } from '@/entities/run/api/run-queries';
import RunningList from '@/entities/run/ui/running-list';

interface HomePageProps {
  dehydratedState: DehydratedState;
}

export default function HomePage({ dehydratedState }: HomePageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">러닝 기록</h1>
        <QueryBoundary>
          <RunningList />
        </QueryBoundary>
      </div>
    </HydrationBoundary>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(runQueries.infinite());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
