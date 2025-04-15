import { useFormContext } from 'react-hook-form';
import { isNil } from 'es-toolkit';
import { Input } from '@/shared/ui/input';
import { RunningListFiltersSchema } from '../../model/running-list-filters-schema';

interface RunningFilterInputProps {
  label: string;
  unit: string;
  minField: keyof RunningListFiltersSchema;
  maxField: keyof RunningListFiltersSchema;
}

function setValueAs(value: string | undefined) {
  if (isNil(value) || value === '') return null;
  return Number(value);
}

export default function RunningFilterField({ label, unit, minField, maxField }: RunningFilterInputProps) {
  const { register } = useFormContext<RunningListFiltersSchema>();

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm">{label}</span>
        <Input
          type="number"
          className="h-9 w-24 text-sm"
          placeholder="최소"
          {...register(minField, { setValueAs })}
        />
        <span className="text-sm">-</span>
        <Input
          type="number"
          className="h-9 w-24 text-sm"
          placeholder="최대"
          {...register(maxField, { setValueAs })}
        />
        <span className="ml-1 text-sm">{unit}</span>
      </div>
    </div>
  );
}
