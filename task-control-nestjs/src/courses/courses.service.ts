import { Injectable, Logger } from '@nestjs/common';
import { Courses } from './courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoursesDto } from './create-courses.dto';
import { UpdateCoursesDto } from './update-courses.dto';

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);

  constructor(
    @InjectRepository(Courses)
    private readonly coursesRepository: Repository<Courses>,
  ) {}

  async create(createCourseDto: CreateCoursesDto) {
    this.logger.log('Creating a new course');

    const newCourse = this.coursesRepository.create(createCourseDto);
    return this.coursesRepository
      .save(newCourse)
      .then((course) => ({
        message: 'Course created successfully',
        course,
      }))
      .catch((error) => {
        this.logger.error('Error creating course', error);
        throw error;
      });
  }

  async update(id: number, updateCourseDto: UpdateCoursesDto) {
    this.logger.log(`Updating course with id: ${id}`);

    return this.coursesRepository
      .update(id, updateCourseDto)
      .then(() => ({
        message: 'Course updated successfully',
      }))
      .catch((error) => {
        this.logger.error('Error updating course', error);
        throw error;
      });
  }

  async findAll() {
    this.logger.log('Fetching all courses');
    return this.coursesRepository.find();
  }

  async findOne(id: number) {
    this.logger.log(`Fetching course with id: ${id}`);
    const course = await this.coursesRepository.findOne({ where: { id } });

    if (!course) {
      throw new Error(`Course with id ${id} not found`);
    }

    return course;
  }

  async delete(id: number) {
    this.logger.log(`Removing course with id: ${id}`);
    return this.coursesRepository
      .delete(id)
      .then(() => ({
        message: 'Course removed successfully',
      }))
      .catch((error) => {
        this.logger.error('Error removing course', error);
        throw error;
      });
  }
}
