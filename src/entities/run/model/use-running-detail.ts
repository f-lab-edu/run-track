import { useRouter } from 'next/router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { runQueries } from '../api/run-queries';

export function useRunningDetail() {
  const router = useRouter();

  const { data } = useSuspenseQuery(runQueries.detail(Number(router.query.id)));

  return data;
}
