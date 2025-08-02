import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { Courses } from 'src/courses/courses.entity';
import { Users } from 'src/users/users.entity';
import { UserSubjects } from 'src/user-subjects/user-subjects.entity';

@Entity('user_courses')
export class UserCourses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'progress',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0.0,
  })
  progress: number;

  @Column({ name: 'status', type: 'varchar', length: 20 })
  status: string;

  @Column({
    name: 'started_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startedAt: Date;

  @Column({ name: 'completed_at', type: 'timestamp' })
  completedAt: Date;

  @Column({ name: 'certificate_url', type: 'varchar', nullable: true })
  certificateUrl: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.userCourses)
  user: Users;

  @ManyToOne(() => Courses, (course) => course.userCourses)
  course: Courses;

  @OneToMany(() => UserSubjects, (userSubject) => userSubject.userCourse)
  userSubjects: UserSubjects[];
}
