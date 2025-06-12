import { Injectable, Logger } from '@nestjs/common';
import { CreateTasksCategoryDto } from './create-tasks-category.dto';
import { TasksCategory } from './tasks-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksCategoryService {
  private readonly logger = new Logger(TasksCategoryService.name);

  constructor(
    @InjectRepository(TasksCategory)
    private readonly usersRepository: Repository<TasksCategory>,
  ) {}

  create(createCategoryDto: CreateTasksCategoryDto) {
    this.logger.log('Creating a new task category');

    const newCategory = this.usersRepository.create(createCategoryDto);
    return this.usersRepository
      .save(newCategory)
      .then((category) => ({
        message: 'Task category created successfully',
        category,
      }))
      .catch((error) => {
        this.logger.error('Error creating task category', error);
        throw error;
      });
  }

  findAll() {
    this.logger.log('Fetching all task categories');
    return this.usersRepository.find();
  }

  findOne(id: number) {
    this.logger.log(`Fetching task category with id: ${id}`);
    return this.usersRepository.findOne({ where: { id } });
  }

  update(id: string, updateCategoryDto: CreateTasksCategoryDto) {
    this.logger.log(`Updating task category with id: ${id}`);

    return this.usersRepository
      .update(id, updateCategoryDto)
      .then(() => ({
        message: 'Task category updated successfully',
        id,
      }))
      .catch((error) => {
        this.logger.error('Error updating task category', error);
        throw error;
      });
  }

  delete(id: string) {
    this.logger.log(`Removing task category with id: ${id}`);
    return this.usersRepository
      .delete(id)
      .then(() => ({
        message: 'Task category removed successfully',
        id,
      }))
      .catch((error) => {
        this.logger.error('Error removing task category', error);
        throw error;
      });
  }
}
