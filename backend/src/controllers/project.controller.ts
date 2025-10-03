import type { Request, Response } from 'express';
import { Project } from '../models/Project';

export async function listProjects(_req: Request, res: Response) {
  try {
    const docs = await Project.find().sort({ createdAt: -1 });
    res.json(docs.map((d) => d.toJSON()));
  } catch {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

export async function createProject(req: Request, res: Response) {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Name required' });
  try {
    const p = await Project.create({ name });
    res.status(201).json(p.toJSON());
  } catch {
    res.status(500).json({ error: 'Failed to create project' });
  }
}
