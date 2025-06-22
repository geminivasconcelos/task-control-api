import { Column, Entity } from 'typeorm';

@Entity()
export class Tasks {
  @Column({ name: 'id', primary: true, generated: true })
  id: number;

  @Column({ name: 'uuid', default: () => 'gen_random_uuid()' })
  uuid: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'status', nullable: true })
  status: string;

  @Column({ name: 'priority', nullable: true })
  priority: string;

  @Column({ name: 'created_in', default: () => 'CURRENT_TIMESTAMP' })
  createdIn: string;

  @Column({ name: 'start_date' })
  startDate: string;

  @Column({ name: 'end_date' })
  endDate: string;

  @Column({ name: 'created_by', nullable: false })
  createdBy: number;
}
