import { Injectable, Logger } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';
import { Subjects } from './subjects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './create-subjects.dto';
import { UpdateSubjectDto } from './update-subjects.dto';

@Injectable()
export class SubjectsService {
  private readonly logger = new Logger(CoursesService.name);

  constructor(
    @InjectRepository(Subjects)
    private readonly subjectsRepository: Repository<Subjects>,
  ) {}

  async create(subject: CreateSubjectDto) {
    this.logger.log('Creating a new subject');

    const createData: any = { ...subject };

    if (subject.courseId) {
      createData.course = { id: subject.courseId };
    }

    if (subject.prerequisites && Array.isArray(subject.prerequisites)) {
      createData.prerequisites = subject.prerequisites.map((prereqId) => ({
        id: prereqId,
      }));
    }

    const newSubject = this.subjectsRepository.create(createData);

    return this.subjectsRepository
      .save(newSubject)
      .then((subject) => ({
        message: 'Subject created successfully',
        subject,
      }))
      .catch((error) => {
        this.logger.error('Error creating subject', error);
        throw error;
      });
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    this.logger.log(`Updating subject with id: ${id}`);

    // Map prerequisites from string[] to { id: string }[] if present
    const updateData: any = { ...updateSubjectDto };
    if (
      updateSubjectDto.prerequisites &&
      Array.isArray(updateSubjectDto.prerequisites)
    ) {
      updateData.prerequisites = updateSubjectDto.prerequisites.map(
        (prereqId) => ({ id: prereqId }),
      );
    }

    return this.subjectsRepository
      .update(id, updateData)
      .then(() => ({
        message: 'Subject updated successfully',
      }))
      .catch((error) => {
        this.logger.error('Error updating subject', error);
        throw error;
      });
  }

  async findAll(): Promise<Subjects[]> {
    this.logger.log('Fetching all subjects');
    return this.subjectsRepository.find();
  }

  async findOne(id: number): Promise<Subjects> {
    this.logger.log(`Finding subject with id: ${id}`);
    const subject = await this.subjectsRepository.findOne({ where: { id } });

    if (!subject) {
      throw new Error(`Subject with id ${id} not found`);
    }

    return subject;
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`Deleting subject with id: ${id}`);
    const result = await this.subjectsRepository.delete(id);

    if (result.affected === 0) {
      throw new Error(`Subject with id ${id} not found`);
    }

    this.logger.log(`Subject with id ${id} deleted successfully`);
  }

  async findByCourseId(courseId: number): Promise<Subjects[]> {
    this.logger.log(`Finding subjects for course with id: ${courseId}`);
    return this.subjectsRepository.find({
      where: { course: { id: courseId } },
    });
  }

  async findByName(name: string): Promise<Subjects[]> {
    this.logger.log(`Finding subjects with name: ${name}`);
    return this.subjectsRepository.find({ where: { name } });
  }

  async findByWorkload(workload: number): Promise<Subjects[]> {
    this.logger.log(`Finding subjects with workload: ${workload}`);
    return this.subjectsRepository.find({ where: { workload } });
  }

  async findByIsMandatory(isMandatory: boolean): Promise<Subjects[]> {
    this.logger.log(`Finding subjects with isMandatory: ${isMandatory}`);
    return this.subjectsRepository.find({ where: { isMandatory } });
  }
}
