import { GetServerSidePropsContext } from 'next';
import { dehydrate, DehydratedState, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';
import { QueryBoundary } from '@/shared/ui/query-boundary';
import { Button } from '@/shared/ui/button';
import { RunningList, RunningListFilters, RunningStatsCard, runQueries } from '@/entities/run';

interface HomePageProps {
  dehydratedState: DehydratedState;
}

export default function HomePage({ dehydratedState }: HomePageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">러닝 기록</h1>
          <Button
            onClick={() => {
              overlay.open(({ isOpen, close }) => (
                <RunningStatsCard
                  open={isOpen}
                  onClose={close}
                />
              ));
            }}
          >
            기록 통계
          </Button>
        </div>
        <RunningListFilters />
        <QueryBoundary>
          <RunningList />
        </QueryBoundary>
      </div>
    </HydrationBoundary>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(runQueries.infinite(context.query));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
