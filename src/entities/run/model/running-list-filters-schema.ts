import { z } from 'zod';

export const runningListFiltersSchema = z.object({
  minDistance: z.number().nullable(),
  maxDistance: z.number().nullable(),
  minTime: z.number().nullable(),
  maxTime: z.number().nullable(),
  minPace: z.number().nullable(),
  maxPace: z.number().nullable(),
});

export type RunningListFiltersSchema = z.infer<typeof runningListFiltersSchema>;
