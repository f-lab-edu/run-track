import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { RunDto } from '@/entities/run';
import { isNotNil } from 'es-toolkit';

const dataFilePath = path.join(process.cwd(), 'data', 'runs.json');

type ResponseData = {
  runs: RunDto[];
  nextCursor: number | null;
  hasMore: boolean;
};

function readRuns(): RunDto[] {
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(jsonData);
}

function filterRuns(
  runs: RunDto[],
  filters: {
    minDistance?: number;
    maxDistance?: number;
    minDuration?: number;
    maxDuration?: number;
    minPace?: number;
    maxPace?: number;
  },
) {
  return runs.filter((run) => {
    if (isNotNil(filters.minDistance) && run.distance < filters.minDistance) return false;
    if (isNotNil(filters.maxDistance) && run.distance > filters.maxDistance) return false;
    if (isNotNil(filters.minDuration) && run.duration < filters.minDuration) return false;
    if (isNotNil(filters.maxDuration) && run.duration > filters.maxDuration) return false;

    // 페이스는 문자열이므로 숫자로 변환하여 비교
    const pace = parseFloat(run.pace);
    if (isNotNil(filters.minPace) && pace < filters.minPace) return false;
    if (isNotNil(filters.maxPace) && pace > filters.maxPace) return false;

    return true;
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const runs = readRuns();

  // 필터링 적용
  const filters = {
    minDistance: isNotNil(req.query.minDistance) ? parseFloat(req.query.minDistance as string) : undefined,
    maxDistance: isNotNil(req.query.maxDistance) ? parseFloat(req.query.maxDistance as string) : undefined,
    minDuration: isNotNil(req.query.minDuration) ? parseInt(req.query.minDuration as string) : undefined,
    maxDuration: isNotNil(req.query.maxDuration) ? parseInt(req.query.maxDuration as string) : undefined,
    minPace: isNotNil(req.query.minPace) ? parseFloat(req.query.minPace as string) : undefined,
    maxPace: isNotNil(req.query.maxPace) ? parseFloat(req.query.maxPace as string) : undefined,
  };

  const filteredRuns = filterRuns(runs, filters);

  // 날짜 기준으로 역순 정렬
  const sortedRuns = [...filteredRuns].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const cursor = req.query.cursor ? parseInt(req.query.cursor as string) : null;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

  const startIndex = cursor ? sortedRuns.findIndex((run) => run.id === cursor) + 1 : 0;
  const paginatedRuns = sortedRuns.slice(startIndex, startIndex + limit);

  const nextCursor = paginatedRuns.length === limit ? paginatedRuns[paginatedRuns.length - 1].id : null;

  res.status(200).json({
    runs: paginatedRuns,
    nextCursor,
    hasMore: nextCursor !== null,
  });
}
