import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCoursesDto } from './create-user-courses.dto';
import { UserCourses } from './user-courses.entity';
import { UpdateUserCoursesDto } from './update-user-courses.dto';

@Injectable()
export class UserCoursesService {
  private readonly logger = new Logger(UserCoursesService.name);

  constructor(
    @InjectRepository(UserCourses)
    private readonly userCourseRepository: Repository<UserCourses>,
  ) {}

  create(createUserCoursesDto: CreateUserCoursesDto) {
    this.logger.log('Creating a new user course');
    console.log('User Course data:', createUserCoursesDto);

    const createData: any = { ...createUserCoursesDto };

    if (createUserCoursesDto.userId) {
      createData.user = { id: createUserCoursesDto.userId };
    }

    if (createUserCoursesDto.courseId) {
      createData.course = { id: createUserCoursesDto.courseId };
    }

    const newUserCourse = this.userCourseRepository.create(createData);

    return this.userCourseRepository
      .save(newUserCourse)
      .then((userCourse) => ({
        message: 'User course created successfully',
        userCourse,
      }))
      .catch((error) => {
        this.logger.error('Error creating user course', error);
        throw error;
      });
  }

  async findAll() {
    this.logger.log('Fetching all user courses');
    return this.userCourseRepository.find({
      relations: ['user', 'course'],
    });
  }

  async findOne(id: number) {
    this.logger.log(`Fetching user course with id: ${id}`);
    return this.userCourseRepository.findOne({
      where: { id },
      relations: ['user', 'course'],
    });
  }

  async update(id: number, updateUserCoursesDto: UpdateUserCoursesDto) {
    this.logger.log(`Updating user course with id: ${id}`);

    const updateData: any = { ...updateUserCoursesDto };
    if (updateUserCoursesDto.userId) {
      updateData.user = { id: updateUserCoursesDto.userId };
    }
    if (updateUserCoursesDto.courseId) {
      updateData.course = { id: updateUserCoursesDto.courseId };
    }

    await this.userCourseRepository.update(id, updateData);
    return this.findOne(id);
  }

  async delete(id: number) {
    this.logger.log(`Deleting user course with id: ${id}`);
    await this.userCourseRepository.delete(id);
    return { message: 'User course deleted successfully' };
  }

  async findByUserId(userId: number): Promise<UserCourses[]> {
    this.logger.log(`Fetching user courses for user with id: ${userId}`);
    return this.userCourseRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
  }

  async findByCourseId(courseId: number): Promise<UserCourses[]> {
    this.logger.log(`Fetching user courses for course with id: ${courseId}`);
    return this.userCourseRepository.find({
      where: { course: { id: courseId } },
      relations: ['user'],
    });
  }

  async findByUserAndCourse(
    userId: number,
    courseId: number,
  ): Promise<UserCourses[]> {
    this.logger.log(
      `Fetching user courses for user with id: ${userId} and course with id: ${courseId}`,
    );
    return this.userCourseRepository.find({
      where: { user: { id: userId }, course: { id: courseId } },
    });
  }

  async findByUserAndStatus(
    userId: number,
    status: string,
  ): Promise<UserCourses[]> {
    this.logger.log(
      `Fetching user courses for user with id: ${userId} and status: ${status}`,
    );
    return this.userCourseRepository.find({
      where: { user: { id: userId }, status },
    });
  }

  async findByUserAndProgress(
    userId: number,
    progress: number,
  ): Promise<UserCourses[]> {
    this.logger.log(
      `Fetching user courses for user with id: ${userId} and progress: ${progress}`,
    );
    return this.userCourseRepository.find({
      where: { user: { id: userId }, progress },
    });
  }
}
