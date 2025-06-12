import { IsNotEmpty, IsString } from "class-validator";

export class CreateTasksCategoryDto {
    
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string
}
