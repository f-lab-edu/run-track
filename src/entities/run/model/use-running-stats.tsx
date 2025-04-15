import { subDays } from 'date-fns';
import { RunDto, RunStatsDto } from '../api/dto';
import { useRunningList } from './use-running-list';

export function useRunningStats(): RunStatsDto {
  const { runs } = useRunningList();

  const filtered = runs.filter(isInLastWeek).filter(isIncluded);

  const totalDistance = filtered.reduce((acc, run) => acc + Number(run.distance), 0);
  const averageDistance = filtered.length > 0 ? parseFloat((totalDistance / filtered.length).toFixed(2)) : 0;
  const totalDuration = filtered.reduce((acc, run) => acc + Number(run.duration), 0);
  const averagePace = calculatePace(totalDistance, totalDuration);

  return {
    totalDistance,
    averageDistance,
    totalDuration,
    averagePace,
  };
}

function isInLastWeek(run: RunDto) {
  const runDate = new Date(run.date);
  const lastWeek = subDays(new Date(), 6);
  return runDate >= lastWeek;
}

function isIncluded(run: RunDto) {
  return !run.excluded;
}

function calculatePace(distance: number, duration: number) {
  const paceInMinutes = distance > 0 ? duration / distance : 0;
  const minutes = Math.floor(paceInMinutes);
  const seconds = Math.round((paceInMinutes - minutes) * 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
