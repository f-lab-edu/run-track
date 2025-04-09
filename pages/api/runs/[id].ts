import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { RunDto } from '@/entities/run';

const dataFilePath = path.join(process.cwd(), 'data', 'runs.json');

function readRuns(): RunDto[] {
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(jsonData);
}

function writeRuns(runs: RunDto[]): void {
  fs.writeFileSync(dataFilePath, JSON.stringify(runs, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse<RunDto | { message: string }>) {
  if (req.method === 'GET') {
    const id = parseInt(req.query.id as string);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const runs = readRuns();
    const run = runs.find((run) => run.id === id);

    if (!run) {
      return res.status(404).json({ message: 'Run not found' });
    }

    return res.status(200).json(run);
  } else if (req.method === 'PATCH') {
    const id = parseInt(req.query.id as string);
    const { excluded } = req.body;

    if (isNaN(id) || typeof excluded !== 'boolean') {
      return res.status(400).json({ message: 'Invalid request' });
    }

    const runs = readRuns();
    const runIndex = runs.findIndex((run) => run.id === id);

    if (runIndex === -1) {
      return res.status(404).json({ message: 'Run not found' });
    }

    runs[runIndex].excluded = excluded;
    writeRuns(runs);

    res.status(200).json({ message: 'Run updated successfully' });
  } else {
    res.setHeader('Allow', ['GET', 'PATCH']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
