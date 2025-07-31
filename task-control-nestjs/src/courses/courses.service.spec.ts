import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Courses } from './courses.entity';
import { Repository } from 'typeorm';

const courseEntity = {
  id: 1,
  name: 'Curso Teste',
  description: 'Descrição',
  isActive: true,
  totalWorkload: 100,
  mandatoryWorkload: 60,
  optionalWorkload: 20,
  complementaryActivity: 20,
  maximumDuration: 8,
  minimumDuration: 4,
  averageDuration: 6,
  createdIn: '2024-07-31',
  updatedIn: '2024-07-31',
};

describe('CoursesService', () => {
  let service: CoursesService;
  let repo: Repository<Courses>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Courses),
          useValue: {
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn().mockResolvedValue(courseEntity),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            find: jest.fn().mockResolvedValue([courseEntity]),
            findOne: jest.fn().mockResolvedValue(courseEntity),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    repo = module.get<Repository<Courses>>(getRepositoryToken(Courses));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    const dto = {
      name: 'Curso Teste',
      mandatoryWorkload: 60,
      optionalWorkload: 20,
      complementaryActivity: 20,
      maximumDuration: 8,
      minimumDuration: 4,
      averageDuration: 6,
    };
    const result = await service.create(dto as any);
    expect(result).toHaveProperty('message', 'Course created successfully');
    expect(result).toHaveProperty('course');
  });

  it('should update a course', async () => {
    const dto = { name: 'Curso Atualizado' };
    const result = await service.update(1, dto as any);
    expect(result).toHaveProperty('message', 'Course updated successfully');
  });

  it('should find all courses', async () => {
    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('name', 'Curso Teste');
  });

  it('should find one course', async () => {
    const result = await service.findOne(1);
    expect(result).toHaveProperty('id', 1);
  });

  it('should remove a course', async () => {
    const result = await service.delete(1);
    expect(result).toHaveProperty('message', 'Course removed successfully');
  });

  it('should throw error if course not found in findOne', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined as any);
    await expect(service.findOne(999)).rejects.toThrow(
      'Course with id 999 not found',
    );
  });

  it('should handle error in update', async () => {
    jest.spyOn(repo, 'update').mockRejectedValueOnce(new Error('DB error'));
    await expect(service.update(1, { name: 'Erro' } as any)).rejects.toThrow(
      'DB error',
    );
  });

  it('should handle error in remove', async () => {
    jest.spyOn(repo, 'delete').mockRejectedValueOnce(new Error('Remove error'));
    await expect(service.delete(1)).rejects.toThrow('Remove error');
  });

  it('should handle error in update', async () => {
    jest.spyOn(repo, 'update').mockRejectedValueOnce(new Error('DB error'));
    await expect(service.update(1, { name: 'Erro' } as any)).rejects.toThrow(
      'DB error',
    );
  });
});
