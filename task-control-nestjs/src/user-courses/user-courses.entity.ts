import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Courses } from 'src/courses/courses.entity';
import { Users } from 'src/users/users.entity';

@Entity('user_courses')
export class UserCourses {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.userCourses, { eager: false })
  user: Users;

  @ManyToOne(() => Courses, (course) => course.userCourses, { eager: false })
  course: Courses;

  //   @OneToMany(() => UserSubject, (userSubject) => userSubject.userCourse)
  //   userSubjects: UserSubject[];

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  progress: number;

  @Column({ type: 'varchar', length: 20, default: 'em andamento' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  grade: number;

  @Column({ type: 'varchar', nullable: true })
  certificateUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
