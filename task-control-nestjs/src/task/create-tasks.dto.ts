import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  @IsOptional()
  priority: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  createdBy: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}
