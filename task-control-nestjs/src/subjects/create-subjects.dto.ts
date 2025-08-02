import {
  IsNotEmpty,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsArray,
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

  @IsNotEmpty()
  @IsInt()
  semester: number;

  @IsOptional()
  @IsArray()
  prerequisites?: number[];

  @IsOptional()
  @IsString()
  createdIn?: string;

  @IsOptional()
  @IsString()
  updatedIn?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsNotEmpty()
  @IsString()
  code: string;
}
