import { describe, expect, it } from 'vitest';
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

  it('filters tasks by user', () => {
    const service = new TaskService();
    service.createTask({ type: TaskType.IMAGE, payload: {}, userId: 'u1' });
    service.createTask({ type: TaskType.VIDEO, payload: {}, userId: 'u2' });

    const u1Tasks = service.listTasks('u1');
    expect(u1Tasks).toHaveLength(1);
    expect(u1Tasks[0].userId).toBe('u1');
  });
});
