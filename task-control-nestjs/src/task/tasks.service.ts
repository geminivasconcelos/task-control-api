import { Injectable, Logger } from '@nestjs/common';
import { Tasks } from './tasks.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Tasks)
    private readonly tasksRepository: Repository<Tasks>,
  ) {}

  create(createTaskDto: any) {
    this.logger.log('Creating a new task');

    const newTask = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository
      .save(newTask)
      .then((task) => ({
        message: 'Task created successfully',
        task,
      }))
      .catch((error) => {
        this.logger.error('Error creating task', error);
        throw error;
      });
  }

  findAll() {
    this.logger.log('Fetching all tasks');
    return this.tasksRepository.find();
  }

  findOne(id: number) {
    this.logger.log(`Fetching task with id: ${id}`);
    return this.tasksRepository.findOne({ where: { id } });
  }

  update(id: number, updateTaskDto: any) {
    this.logger.log(`Updating task with id: ${id}`);

    return this.tasksRepository
      .update(id, updateTaskDto)
      .then(() => ({
        message: 'Task updated successfully',
        id,
      }))
      .catch((error) => {
        this.logger.error('Error updating task', error);
        throw error;
      });
  }

  delete(id: number) {
    this.logger.log(`Removing task with id: ${id}`);
    return this.tasksRepository
      .delete(id)
      .then(() => ({
        message: 'Task deleted successfully',
        id,
      }))
      .catch((error) => {
        this.logger.error('Error deleting task', error);
        throw error;
      });
  }

  findByCategory(categoryId: number) {
    this.logger.log(`Fetching tasks for category with id: ${categoryId}`);
    return this.tasksRepository.find({
      where: { category: categoryId },
    });
  }

  findByUser(userId: number) {
    this.logger.log(`Fetching tasks for user with id: ${userId}`);
    return this.tasksRepository.find({
      where: { createdBy: userId },
    });
  }

  findByStatus(status: string) {
    this.logger.log(`Fetching tasks with status: ${status}`);
    return this.tasksRepository.find({
      where: { status },
    });
  }

  findByPriority(priority: string) {
    this.logger.log(`Fetching tasks with priority: ${priority}`);
    return this.tasksRepository.find({
      where: { priority },
    });
  }

  findByDateRange(startDate: string, endDate: string) {
    this.logger.log(`Fetching tasks between ${startDate} and ${endDate}`);
    return this.tasksRepository.find({
      where: {
        startDate: MoreThanOrEqual(startDate),
        endDate: LessThanOrEqual(endDate),
      },
    });
  }

  findByName(name: string) {
    this.logger.log(`Fetching tasks with name: ${name}`);
    return this.tasksRepository.find({
      where: { name },
    });
  }

  findByCreatedIn(createdIn: string) {
    this.logger.log(`Fetching tasks created in: ${createdIn}`);
    return this.tasksRepository.find({
      where: { createdIn },
    });
  }
}
