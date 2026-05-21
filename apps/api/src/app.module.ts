import { Module } from '@nestjs/common';
import { AiController } from './ai.controller.js';
import { TaskService } from './tasks/task.service.js';

@Module({
  controllers: [AiController],
  providers: [TaskService],
})
export class AppModule {}
