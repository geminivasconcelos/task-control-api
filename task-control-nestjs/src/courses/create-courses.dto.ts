import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateCoursesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  totalWorkload?: number;

  @IsNotEmpty()
  @IsNumber()
  mandatoryWorkload: number;

  @IsNotEmpty()
  @IsNumber()
  optionalWorkload: number;

  @IsNotEmpty()
  @IsNumber()
  complementaryActivity: number;

  @IsNotEmpty()
  @IsNumber()
  maximumDuration: number;

  @IsNotEmpty()
  @IsNumber()
  minimumDuration: number;

  @IsNotEmpty()
  @IsNumber()
  averageDuration: number;
}
