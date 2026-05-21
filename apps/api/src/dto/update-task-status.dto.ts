import { IsIn, IsOptional, IsObject, IsString } from 'class-validator';
import type { TaskStatus } from '../tasks/task.service.js';

export class UpdateTaskStatusDto {
  @IsIn(['queued', 'running', 'succeeded', 'failed'])
  status!: TaskStatus;

  @IsOptional()
  @IsObject()
  result?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  error?: string;
}
