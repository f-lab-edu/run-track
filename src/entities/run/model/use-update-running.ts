import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRun } from '../api/update-run';
import { runQueries } from '../api/run-queries';

export function useUpdateRunning() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateRun,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: runQueries.detail(id).queryKey });
    },
  });

  return { updateRunning: mutate, isPending };
}
