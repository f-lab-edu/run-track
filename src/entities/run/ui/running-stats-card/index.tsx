import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { QueryBoundary } from '@/shared/ui/query-boundary';
import RunningStats from './running-stats';
import SkeletonStats from './skeleton-stats';

interface RunStatsCardProps {
  open: boolean;
  onClose?: () => void;
}

export default function RunStatsCard({ open, onClose }: RunStatsCardProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">러닝 통계</DialogTitle>
        </DialogHeader>
        <QueryBoundary pendingFallback={<SkeletonStats />}>
          <RunningStats />
        </QueryBoundary>
      </DialogContent>
    </Dialog>
  );
}
