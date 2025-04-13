import { Filter } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import RunningFilterInput from './running-filter-input';

export default function RunningListFilters() {
  return (
    <div className="mb-6 rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center text-sm font-medium">
          <Filter className="mr-1 h-4 w-4" />
          필터
        </h2>
      </div>
      <RunningFilterInput
        label="거리"
        unit="km"
      />
      <RunningFilterInput
        label="시간"
        unit="분"
      />
      <RunningFilterInput
        label="페이스"
        unit="분/km"
      />
      <Button className="w-full">적용</Button>
    </div>
  );
}
