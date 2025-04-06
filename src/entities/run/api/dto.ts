export interface RunDto {
  id: number;
  date: string;
  distance: number;
  duration: number;
  pace: string;
  location: string;
  note: string;
  excluded: boolean;
}

export interface RunStatsDto {
  totalDistance: number;
  averageDistance: number;
  totalDuration: number;
  averagePace: string;
}
