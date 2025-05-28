import { Router, Request, Response,  RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from '../types/task';
import { z } from 'zod';

const router = Router();
let tasks: Task[] = [];

const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
});

// GET /tasks
router.get('/', (req: Request, res: Response) => {
  res.json(tasks);
});

// POST /tasks
router.post('/', (req: Request, res: Response) => {
  try {
    const validatedData = TaskSchema.parse(req.body);
    const newTask: Task = {
      id: uuidv4(),
      status: TaskStatus.PENDING,
      ...validatedData
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Invalid task data' });
  }
});

// DELETE /tasks/:id
router.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  tasks = tasks.filter(task => task.id !== req.params.id);
  res.sendStatus(204);
});


const patchTaskHandler: RequestHandler<{ id: string }> = (req, res): void => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  task.status = task.status === TaskStatus.PENDING ? TaskStatus.DONE : TaskStatus.PENDING;
  res.json(task);
};

export default router;