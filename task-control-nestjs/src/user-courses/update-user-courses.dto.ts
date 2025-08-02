import { PartialType } from "@nestjs/swagger";
import { CreateUserCoursesDto } from "./create-user-courses.dto";

export class UpdateUserCoursesDto extends PartialType(CreateUserCoursesDto) {}