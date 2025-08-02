import { Courses } from 'src/courses/courses.entity';
import { UserSubjects } from 'src/user-subjects/user-subjects.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('subjects')
export class Subjects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'workload', type: 'int' })
  workload: number;

  @Column({ name: 'is_mandatory', default: true })
  isMandatory: boolean;

  @ManyToOne(() => Courses, (course) => course.subjects)
  course: Courses;

  @OneToMany(() => UserSubjects, (userSubject) => userSubject.subject)
  userSubjects: UserSubjects[];
}
