import { Column, Entity } from 'typeorm';

@Entity()
export class TasksCategory {
  @Column({ name: 'id', primary: true, generated: true })
  id: number;

  @Column({ name: 'uuid', default: () => 'gen_random_uuid()' })
  uuid: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'created_in', default: () => 'CURRENT_TIMESTAMP' })
  createdIn: string;

  @Column({ name: 'created_by', nullable: false })
  createdBy: string;

  @Column({ name: 'updated_in', default: () => 'CURRENT_TIMESTAMP' })
  updatedIn: string;
}
