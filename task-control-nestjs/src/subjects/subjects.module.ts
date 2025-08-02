import { SubjectsController } from './subjects.controller';

import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subjects } from './subjects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Subjects])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [TypeOrmModule]
})
export class SubjectsModule {}
