import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { RunDto } from '@/entities/run';

const dataFilePath = path.join(process.cwd(), 'data', 'runs.json');

type StatsResponse = {
  totalDistance: number;
  averageDistance: number;
  totalDuration: number;
  averagePace: string;
};

function readRuns(): RunDto[] {
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(jsonData);
}

function calculatePace(distance: number, duration: number): string {
  // 페이스는 km당 분:초 형식
  const paceInMinutes = duration / distance;
  const minutes = Math.floor(paceInMinutes);
  const seconds = Math.round((paceInMinutes - minutes) * 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<StatsResponse | { message: string }>) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'startDate와 endDate는 필수 파라미터입니다.' });
  }

  try {
    const allRuns = readRuns();

    // 날짜 범위에 있고 excluded가 false인 러닝 기록만 필터링
    const filteredRuns = allRuns.filter(
      (run) => run.date >= startDate && run.date <= endDate && run.excluded === false,
    );

    if (filteredRuns.length === 0) {
      return res.status(200).json({
        totalDistance: 0,
        averageDistance: 0,
        totalDuration: 0,
        averagePace: '0:00',
      });
    }

    // 총 거리와 시간 계산
    const totalDistance = filteredRuns.reduce((sum, run) => sum + run.distance, 0);
    const totalDuration = filteredRuns.reduce((sum, run) => sum + run.duration, 0);

    // 평균 거리 계산 (소수점 2자리 반올림)
    const averageDistance = parseFloat((totalDistance / filteredRuns.length).toFixed(2));

    // 평균 페이스 계산
    const averagePace = calculatePace(totalDistance, totalDuration);

    res.status(200).json({
      totalDistance,
      averageDistance,
      totalDuration,
      averagePace,
    });
  } catch (error) {
    console.error('통계 계산 중 오류 발생:', error);
    res.status(500).json({ message: '통계를 계산하는 중 오류가 발생했습니다.' });
  }
}
