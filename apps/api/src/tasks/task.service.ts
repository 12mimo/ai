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

interface ListTaskFilters {
  userId?: string;
  status?: TaskStatus;
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

    this.simulateAsyncExecution(id, task.type);
    return task;
  }

  getTask(id: string): TaskRecord {
    const task = this.tasks.get(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  listTasks(filters: ListTaskFilters = {}): TaskRecord[] {
    const allTasks = Array.from(this.tasks.values()).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );

    return allTasks.filter((task) => {
      if (filters.userId && task.userId !== filters.userId) return false;
      if (filters.status && task.status !== filters.status) return false;
      return true;
    });
  }

  updateTaskStatus(id: string, status: TaskStatus, patch: Partial<Pick<TaskRecord, 'result' | 'error'>> = {}) {
    const task = this.getTask(id);
    const updated: TaskRecord = {
      ...task,
      status,
      updatedAt: new Date().toISOString(),
    };

    if (patch.result !== undefined) updated.result = patch.result;
    if (patch.error !== undefined) updated.error = patch.error;

    this.tasks.set(id, updated);
    return updated;
  }

  private simulateAsyncExecution(id: string, taskType: string) {
    setTimeout(() => {
      this.updateTaskStatus(id, 'running');
      setTimeout(() => {
        this.updateTaskStatus(id, 'succeeded', {
          result: { message: `Task ${taskType} completed` },
        });
      }, 150);
    }, 10);
  }
}
