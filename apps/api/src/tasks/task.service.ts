import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateTaskDto } from '../dto/create-task.dto.js';

export type TaskStatus = 'queued' | 'running' | 'succeeded' | 'failed';

export interface TaskRecord {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  status: TaskStatus;
  userId?: string;
  result?: Record<string, unknown>;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class TaskService {
  private readonly tasks = new Map<string, TaskRecord>();

  createTask(dto: CreateTaskDto): TaskRecord {
    const now = new Date().toISOString();
    const id = randomUUID();
    const task: TaskRecord = {
      id,
      type: dto.type,
      payload: dto.payload,
      status: 'queued',
      userId: dto.userId,
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.set(id, task);

    // Simulate async execution until worker queue is integrated.
    setTimeout(() => {
      this.updateStatus(id, 'running');
      setTimeout(() => {
        this.completeTask(id, { message: `Task ${task.type} completed` });
      }, 150);
    }, 10);

    return task;
  }

  getTask(id: string): TaskRecord {
    const task = this.tasks.get(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  listTasks(userId?: string): TaskRecord[] {
    const allTasks = Array.from(this.tasks.values()).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
    if (!userId) return allTasks;
    return allTasks.filter((task) => task.userId === userId);
  }

  private updateStatus(id: string, status: TaskStatus) {
    const task = this.getTask(id);
    this.tasks.set(id, { ...task, status, updatedAt: new Date().toISOString() });
  }

  private completeTask(id: string, result: Record<string, unknown>) {
    const task = this.getTask(id);
    this.tasks.set(id, {
      ...task,
      status: 'succeeded',
      result,
      updatedAt: new Date().toISOString(),
    });
  }
}
