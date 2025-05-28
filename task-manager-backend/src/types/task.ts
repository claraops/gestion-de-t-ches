export enum TaskStatus {
  PENDING = 'pending',
  DONE = 'done'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export type CreateTaskRequest = Omit<Task, 'id' | 'status'>;