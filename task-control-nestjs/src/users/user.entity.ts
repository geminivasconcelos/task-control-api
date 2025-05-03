import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column({ name: 'id', primary: true, generated: true })
  id: number;

  @Column({ name: 'uuid' })
  uuid: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'surname' })
  surname: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'created_in' })
  createdIn: string;
}
