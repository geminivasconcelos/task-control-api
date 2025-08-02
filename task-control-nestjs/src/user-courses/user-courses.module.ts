import { Module } from '@nestjs/common';
import { UserCourses } from './user-courses.entity';
import { UserCoursesService } from './user-courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCoursesController } from './user-courses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserCourses])],
  controllers: [UserCoursesController],
  providers: [UserCoursesService],
  exports: [UserCoursesService],
})
export class UserCoursesModule {}
