import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from './task-status.enum';

export class UpdateTasks {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  priority?: string;

  @IsOptional()
  startDate?: string;

  @IsOptional()
  endDate?: string;

  @IsOptional()
  category?: number;
}
