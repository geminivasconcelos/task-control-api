import {
  IsNotEmpty,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  workload: number;

  @IsOptional()
  @IsBoolean()
  isMandatory?: boolean;

  @IsNotEmpty()
  @IsInt()
  courseId: number;
}
