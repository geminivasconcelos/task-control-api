import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsInt } from 'class-validator';

export class CreateUserCoursesDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  courseId: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  progress?: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsDate()
  startedAt?: Date;

  @IsOptional()
  @IsDate()
  completedAt?: Date;

  @IsOptional()
  @IsString()
  certificateUrl?: string;
}