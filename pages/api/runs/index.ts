import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { RunDto } from '@/entities/run';

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

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const runs = readRuns();
  const cursor = req.query.cursor ? parseInt(req.query.cursor as string) : null;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

  const startIndex = cursor ? runs.findIndex((run) => run.id === cursor) + 1 : 0;
  const paginatedRuns = runs.slice(startIndex, startIndex + limit);

  const nextCursor = paginatedRuns.length === limit ? paginatedRuns[paginatedRuns.length - 1].id : null;

  res.status(200).json({
    runs: paginatedRuns,
    nextCursor,
    hasMore: nextCursor !== null,
  });
}
