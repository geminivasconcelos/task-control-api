import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateTasksCategoryDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
