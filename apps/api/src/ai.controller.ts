import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { TaskService } from './tasks/task.service.js';

@Controller('ai')
export class AiController {
  constructor(private readonly taskService: TaskService) {}

  @Post('tasks')
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Get('tasks')
  listTasks(@Query('userId') userId?: string) {
    return this.taskService.listTasks(userId);
  }

  @Get('tasks/:id')
  getTask(@Param('id') id: string) {
    return this.taskService.getTask(id);
  }
}
