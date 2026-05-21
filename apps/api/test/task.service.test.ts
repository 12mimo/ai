import { describe, expect, it, vi } from 'vitest';
import { TaskService } from '../src/tasks/task.service.js';
import { TaskType } from '../src/dto/create-task.dto.js';

describe('TaskService', () => {
  it('creates and retrieves a task', () => {
    const service = new TaskService();
    const created = service.createTask({
      type: TaskType.CHAT,
      payload: { prompt: 'hello' },
      userId: 'u1',
    });

    const found = service.getTask(created.id);
    expect(found.id).toBe(created.id);
    expect(found.type).toBe(TaskType.CHAT);
    expect(found.status).toBe('queued');
  });

  it('filters tasks by user and status', () => {
    const service = new TaskService();
    const t1 = service.createTask({ type: TaskType.IMAGE, payload: {}, userId: 'u1' });
    service.createTask({ type: TaskType.VIDEO, payload: {}, userId: 'u2' });
    service.updateTaskStatus(t1.id, 'failed', { error: 'test error' });

    const u1Failed = service.listTasks({ userId: 'u1', status: 'failed' });
    expect(u1Failed).toHaveLength(1);
    expect(u1Failed[0].userId).toBe('u1');
    expect(u1Failed[0].status).toBe('failed');
  });

  it('completes task asynchronously in simulation', () => {
    vi.useFakeTimers();
    const service = new TaskService();
    const task = service.createTask({ type: TaskType.POSTER, payload: {}, userId: 'u3' });

    vi.advanceTimersByTime(200);
    const found = service.getTask(task.id);
    expect(found.status).toBe('succeeded');
    expect(found.result?.message).toContain('completed');
    vi.useRealTimers();
  });
});
