import { IsIn, IsOptional, IsString } from 'class-validator';
import type { TaskStatus } from '../tasks/task.service.js';

export class ListTasksDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsIn(['queued', 'running', 'succeeded', 'failed'])
  status?: TaskStatus;
}
