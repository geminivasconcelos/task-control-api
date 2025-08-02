import { UserCourses } from 'src/user-courses/user-courses.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @Column({ name: 'id', primary: true, generated: true })
  id: number;

  @Column({ name: 'uuid', default: () => 'gen_random_uuid()' })
  uuid: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'surname' })
  surname: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'created_in', default: () => 'CURRENT_TIMESTAMP' })
  createdIn: string;

  @OneToMany(() => UserCourses, (userCourse) => userCourse.user)
  userCourses: UserCourses[];
}
