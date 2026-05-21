import { IsEnum, IsObject, IsString, IsOptional } from 'class-validator';

export enum TaskType {
  CHAT = 'chat',
  IMAGE = 'image',
  VIDEO = 'video',
  POSTER = 'poster',
  PRODUCT_IMAGE = 'product_image',
  DETAIL_IMAGE = 'detail_image',
}

export class CreateTaskDto {
  @IsEnum(TaskType)
  type!: TaskType;

  @IsObject()
  payload!: Record<string, unknown>;

  @IsString()
  @IsOptional()
  userId?: string;
}
