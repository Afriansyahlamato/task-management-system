
import type { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { Task } from '../models/Task';
import { Project } from '../models/Project';
import { User } from '../models/User'; 

export async function listTasks(req: Request, res: Response) {
  try {
    const {
      q = '',
      status = 'all',
      projectId = 'all',
      sort = 'created_desc',
      assignedUser, 
    } = req.query as Record<string, string>;

    const filters: any = { ownerId: req.user!.sub };

    if (status !== 'all') filters.status = status;

    if (projectId !== 'all') {
      if (!mongoose.isValidObjectId(projectId)) {
        return res.status(400).json({ error: 'Invalid projectId' });
      }
      filters.projectId = projectId;
    }

    // assignedUser filter
    if (assignedUser) {
      if (assignedUser === 'unassigned') {
        filters.assignedUserId = null;
      } else if (assignedUser === 'any') {
        filters.assignedUserId = { $ne: null };
      } else if (mongoose.isValidObjectId(assignedUser)) {
        filters.assignedUserId = new Types.ObjectId(assignedUser);
      } else {
        return res.status(400).json({ error: 'Invalid assignedUser' });
      }
    }

    if (q) {
      const rx = new RegExp(String(q).trim(), 'i');
      filters.$or = [{ title: rx }, { description: rx }];
    }

    let sortSpec: any = { createdAt: -1 };
    if (sort === 'due_asc') {
      sortSpec = { due: 1, createdAt: -1 };
    }

    const docs = await Task.find(filters).sort(sortSpec);
    res.json(docs.map((d) => d.toJSON()));
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export async function getTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid task id' });
    }
    const doc = await Task.findOne({ _id: id, ownerId: req.user!.sub });
    if (!doc) return res.status(404).json({ error: 'Task not found' });
    res.json(doc.toJSON());
  } catch {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
}

export async function createTask(req: Request, res: Response) {
  try {
    const {
      projectId,
      title,
      description,
      status,
      priority,
      due,
      assignedUserId, 
    } = req.body || {};

    if (!projectId || !title)
      return res.status(400).json({ error: 'projectId and title required' });

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ error: 'Invalid projectId' });
    }

    const exists = await Project.exists({ _id: projectId });
    if (!exists) return res.status(404).json({ error: 'Project not found' });

    let normalizedAssignee: mongoose.Types.ObjectId | null = null;
    if (assignedUserId) {
      if (!mongoose.isValidObjectId(assignedUserId)) {
        return res.status(400).json({ error: 'Invalid assignedUserId' });
      }

      const userExists = await User.exists({ _id: assignedUserId });
      if (!userExists) return res.status(404).json({ error: 'Assigned user not found' });
      normalizedAssignee = new Types.ObjectId(assignedUserId);
    }

    const t = await Task.create({
      projectId,
      ownerId: req.user!.sub,
      title,
      description,
      status: status || 'todo',
      priority: priority || 'medium',
      due: due || null,
      assignedUserId: normalizedAssignee, 
    });

    res.status(201).json(t.toJSON());
  } catch (e) {
    res.status(500).json({ error: 'Failed to create task' });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid task id' });
    }

    if (req.body?.projectId && !(await Project.exists({ _id: req.body.projectId }))) {
      return res.status(400).json({ error: 'projectId does not exist' });
    }

    const update: any = { ...req.body, ownerId: req.user!.sub };

    if ('assignedUserId' in req.body) {
      const val = req.body.assignedUserId;
      if (val === '' || val === null) {
        update.assignedUserId = null; // unassign
      } else {
        if (!mongoose.isValidObjectId(val)) {
          return res.status(400).json({ error: 'Invalid assignedUserId' });
        }

        const userExists = await User.exists({ _id: val });
        if (!userExists) return res.status(404).json({ error: 'Assigned user not found' });
        update.assignedUserId = new Types.ObjectId(val);
      }
    }

    const updated = await Task.findOneAndUpdate(
      { _id: id, ownerId: req.user!.sub },
      update,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated.toJSON());
  } catch (e) {
    res.status(500).json({ error: 'Failed to update task' });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid task id' });
    }
    const result = await Task.findOneAndDelete({ _id: id, ownerId: req.user!.sub });
    if (!result) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}

