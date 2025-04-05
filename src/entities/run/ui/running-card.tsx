import { memo } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { cn } from '@/shared/lib/tw-utils';
import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';
import { RunDto } from '../api/dto';

interface RunningRecordProps {
  run: RunDto;
}

function RunningCard({ run }: RunningRecordProps) {
  const formattedDate = new Date(run.date).toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  });

  const isAggregated = !run.excluded;

  return (
    <Card className="cursor-pointer overflow-hidden py-0 transition-colors hover:bg-slate-50">
      <Link
        href={`/running/${run.id}`}
        className="p-3"
      >
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">{formattedDate}</span>
            <MapPin className="text-muted-foreground h-3 w-3" />
            <span className="text-muted-foreground max-w-[80px] truncate text-xs">{run.location}</span>
          </div>
          <Badge
            variant={isAggregated ? 'default' : 'outline'}
            className={cn('h-4 px-1 text-[10px]', isAggregated && 'bg-green-500 hover:bg-green-600')}
          >
            {isAggregated ? '집계' : '미집계'}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-muted-foreground block text-xs">거리</span>
              <span className="text-sm font-semibold">{run.distance} km</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">시간</span>
              <span className="text-sm font-semibold">{run.duration}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">페이스</span>
              <span className="text-sm font-semibold">{run.pace}</span>
            </div>
          </div>
          <ArrowRight className="text-primary h-3 w-3" />
        </div>
        {run.note && (
          <div className="mt-1">
            <p className="text-muted-foreground line-clamp-1 text-xs italic">{run.note}</p>
          </div>
        )}
      </Link>
    </Card>
  );
}

export default memo(RunningCard);
