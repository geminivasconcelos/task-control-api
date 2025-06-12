import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksCategoryController } from './tasks-category.controller';
import { TasksCategory } from './tasks-category.entity';
import { TasksCategoryService } from './tasks-category.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([TasksCategory])],
  controllers: [TasksCategoryController],
  providers: [TasksCategoryService],
  exports: [TasksCategoryService]
})
export class TasksCategoryModule {}
