import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDate,
  IsInt,
  IsBoolean,
} from 'class-validator';

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

  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsDate()
  completedAt?: Date;

  @IsOptional()
  @IsString()
  certificateUrl?: string;
}
