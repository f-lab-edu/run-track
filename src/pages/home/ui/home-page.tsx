import { RunDto, RunningCard } from '@/entities/run';

const runs: RunDto[] = [
  {
    id: 1,
    date: '2025-03-27',
    distance: 5.2,
    duration: 31,
    pace: '5:57',
    location: '한강 공원',
    note: '가볍게 러닝',
    excluded: true,
  },
  {
    id: 2,
    date: '2025-03-28',
    distance: 7.5,
    duration: 45,
    pace: '6:00',
    location: '올림픽 공원',
    note: '인터벌 트레이닝',
    excluded: false,
  },
  {
    id: 3,
    date: '2025-03-29',
    distance: 10,
    duration: 62,
    pace: '6:12',
    location: '서울숲',
    note: '장거리 러닝',
    excluded: false,
  },
];

export default function HomePage() {
  return (
    <div className="px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">러닝 기록</h1>
      <div className="space-y-4">
        {runs.map((run) => (
          <RunningCard
            key={run.id}
            run={run}
          />
        ))}
      </div>
    </div>
  );
}
