import { isNotNil } from 'es-toolkit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RunDto } from '../api/dto';
import { updateRun } from '../api/update-run';
import { runQueries } from '../api/run-queries';

export function useUpdateRunning() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateRun,
    onMutate: async (params) => {
      const queryKey = runQueries.detail(params.id).queryKey;

      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<RunDto>(queryKey);

      if (isNotNil(prevData)) {
        queryClient.setQueryData(queryKey, { ...prevData, excluded: params.excluded });
      }

      return { prevData, params };
    },
    onError: (_, params, context) => {
      queryClient.setQueryData(runQueries.detail(params.id).queryKey, context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: runQueries.all() });
    },
  });

  return { updateRunning: mutate };
}
