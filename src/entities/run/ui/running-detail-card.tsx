import { Calendar, Clock, MapPin, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/shared/ui/card';
import { Switch } from '@/shared/ui/switch';
import { useRunningDetail } from '../model/use-running-detail';
import { useUpdateRunning } from '../model/use-update-running';

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];

  return `${year}년 ${month}월 ${day}일 (${weekday})`;
}

export default function RunningDetailCard() {
  const run = useRunningDetail();

  const { updateRunning } = useUpdateRunning();

  const handleSwitchChange = (checked: boolean) => {
    updateRunning({ id: run.id, excluded: checked });
  };

  return (
    <Card className="overflow-hidden py-0">
      <CardContent className="p-0">
        <div className="bg-primary text-primary-foreground p-6">
          <div className="mb-2 flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            <span className="text-sm">{formatDate(run.date)}</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{run.distance}</span>
            <span className="ml-1">km</span>
          </div>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="text-muted-foreground mr-2 h-5 w-5" />
              <span className="text-sm font-medium">시간</span>
            </div>
            <span>
              {Math.floor(run.duration / 60)}:{(run.duration % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="text-muted-foreground mr-2 h-5 w-5" />
              <span className="text-sm font-medium">페이스</span>
            </div>
            <span>{run.pace} /km</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="text-muted-foreground mr-2 h-5 w-5" />
              <span className="text-sm font-medium">위치</span>
            </div>
            <span>{run.location}</span>
          </div>
          {run.note && (
            <div className="mt-2 border-t pt-2">
              <h3 className="mb-1 text-sm font-medium">메모</h3>
              <p className="text-muted-foreground text-sm">{run.note}</p>
            </div>
          )}
          <div className="mt-2 border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">통계에서 제외</h3>
                <p className="text-muted-foreground text-xs">이 러닝을 통계 계산에서 제외합니다</p>
              </div>
              <Switch
                checked={run.excluded}
                onCheckedChange={handleSwitchChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
