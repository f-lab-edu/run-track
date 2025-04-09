import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { dehydrate, DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { QueryBoundary } from '@/shared/ui/query-boundary';
import { RunningDetailCard, runQueries } from '@/entities/run';

interface RunningDetailPageProps {
  dehydratedState: DehydratedState;
}

export default function RunningDetailPage({ dehydratedState }: RunningDetailPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 border-b bg-white">
          <div className="container flex h-14 items-center px-4">
            <Link
              href="/"
              className="mr-3"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">뒤로 가기</span>
            </Link>
            <h1 className="text-lg font-medium">러닝 상세</h1>
          </div>
        </header>
        <main className="container flex-1 px-4 py-6">
          <QueryBoundary>
            <RunningDetailCard />
          </QueryBoundary>
        </main>
      </div>
    </HydrationBoundary>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(runQueries.detail(Number(context.params!.id)));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
