import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './tasks.service';

import { Module } from '@nestjs/common';
import { Tasks } from './tasks.entity';
import { TasksContcroller } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  controllers: [TasksContcroller],
  providers: [TaskService],
})
export class TasksModule {}
