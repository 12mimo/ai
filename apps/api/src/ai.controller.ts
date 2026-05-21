import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { ListTasksDto } from './dto/list-tasks.dto.js';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto.js';
import { TaskService } from './tasks/task.service.js';

@Controller('ai')
export class AiController {
  constructor(private readonly taskService: TaskService) {}

  @Post('tasks')
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Get('tasks')
  listTasks(@Query() query: ListTasksDto) {
    return this.taskService.listTasks({ userId: query.userId, status: query.status });
  }

  @Get('tasks/:id')
  getTask(@Param('id') id: string) {
    return this.taskService.getTask(id);
  }

  @Patch('tasks/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto) {
    return this.taskService.updateTaskStatus(id, dto.status, {
      result: dto.result,
      error: dto.error,
    });
  }

  @Get('health')
  health() {
    return { status: 'ok', service: 'api', timestamp: new Date().toISOString() };
  }
}
