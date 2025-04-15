import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { isNotNil } from 'es-toolkit';
import { Filter } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { RunningListFiltersSchema, runningListFiltersSchema } from '../../model/running-list-filters-schema';
import RunningFilterField from './running-filter-field';

const initialValues: RunningListFiltersSchema = {
  minDistance: null,
  maxDistance: null,
  minTime: null,
  maxTime: null,
  minPace: null,
  maxPace: null,
};

export default function RunningListFilters() {
  const router = useRouter();

  const defaultValues = useMemo(
    () => Object.fromEntries(Object.entries(initialValues).map(([key, value]) => [key, router.query[key] ?? value])),
    [router.query],
  );

  const methods = useForm<RunningListFiltersSchema>({
    resolver: zodResolver(runningListFiltersSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<RunningListFiltersSchema> = (data) => {
    const query = Object.fromEntries(Object.entries(data).filter(([, value]) => isNotNil(value)));

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="mb-6 rounded-lg border p-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center text-sm font-medium">
            <Filter className="mr-1 h-4 w-4" />
            필터
          </h2>
        </div>
        <RunningFilterField
          label="거리"
          unit="km"
          minField="minDistance"
          maxField="maxDistance"
        />
        <RunningFilterField
          label="시간"
          unit="분"
          minField="minTime"
          maxField="maxTime"
        />
        <RunningFilterField
          label="페이스"
          unit="분/km"
          minField="minPace"
          maxField="maxPace"
        />
        <Button
          type="submit"
          className="w-full"
        >
          적용
        </Button>
      </form>
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
