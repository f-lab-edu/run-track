import { runsApi } from '@/shared/api/runs-api';

export interface UpdateRunParams {
  id: number;
  excluded: boolean;
}

export async function updateRun({ id, excluded }: UpdateRunParams) {
  await runsApi.patch(`runs/${id}`, { json: { excluded } });
}
