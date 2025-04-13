import { Input } from '@/shared/ui/input';

interface RunningFilterInputProps {
  label: string;
  unit: string;
}

export default function RunningFilterInput({ label, unit }: RunningFilterInputProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm">{label}</span>
        <Input
          type="number"
          className="h-9 w-24 text-sm"
          placeholder="최소"
        />
        <span className="text-sm">-</span>
        <Input
          type="number"
          className="h-9 w-24 text-sm"
          placeholder="최대"
        />
        <span className="ml-1 text-sm">{unit}</span>
      </div>
    </div>
  );
}
