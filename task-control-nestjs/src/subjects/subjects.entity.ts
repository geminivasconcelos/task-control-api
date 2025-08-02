import { Courses } from 'src/courses/courses.entity';
import { UserSubjects } from 'src/user-subjects/user-subjects.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
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

  @Column({ name: 'semester', type: 'int' })
  semester: number;

  @Column({ name: 'created_in', default: () => 'CURRENT_TIMESTAMP' })
  createdIn: string;

  @Column({ name: 'updated_in', default: () => 'CURRENT_TIMESTAMP' })
  updatedIn: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'code', nullable: true })
  code: string;

  @ManyToMany(() => Subjects)
  @JoinTable({
    name: 'subject_prerequisites',
    joinColumn: { name: 'subject_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'prerequisite_id', referencedColumnName: 'id' },
  })
  prerequisites: Subjects[];

  @Column({ name: 'is_mandatory', default: true })
  isMandatory: boolean;

  @ManyToOne(() => Courses, (course) => course.subjects)
  @JoinColumn({ name: 'course_id' })
  course: Courses;

  @OneToMany(() => UserSubjects, (userSubject) => userSubject.subject)
  userSubjects: UserSubjects[];
}
