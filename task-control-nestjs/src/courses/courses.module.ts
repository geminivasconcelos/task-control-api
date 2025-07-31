import { Module } from '@nestjs/common';
import { Courses } from './courses.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Courses])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
