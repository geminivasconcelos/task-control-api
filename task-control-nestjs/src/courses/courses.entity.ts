import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'total_workload', nullable: true })
  totalWorkload: number;

  @Column({ name: 'mandatory_workload' })
  mandatoryWorkload: number;

  @Column({ name: 'optional_workload' })
  optionalWorkload: number;

  @Column({ name: 'complementary_activity' })
  complementaryActivity: number;

  @Column({ name: 'maximum_duration' })
  maximumDuration: number;

  @Column({ name: 'minimum_duration' })
  minimumDuration: number;

  @Column({ name: 'average_duration' })
  averageDuration: number;

  @Column({ name: 'created_in', default: () => 'CURRENT_TIMESTAMP' })
  createdIn: string;

  @Column({ name: 'updated_in', default: () => 'CURRENT_TIMESTAMP' })
  updatedIn: string;
}
