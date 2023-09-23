import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';
import { ClaimTypes } from '../constants/enums/claim-types';

@Entity('claimed_requests')
export class ClaimedRequests implements PolymorphicChildInterface {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  entityId: number;

  @Column({ type: 'varchar', nullable: false })
  entityType: string;

  @Column({ type: 'enum', enum: ClaimTypes, nullable: true })
  claimType: string;

  @Column({ type: 'varchar', nullable: true })
  businessEmail: string;

  @Column({ type: 'varchar', nullable: true })
  businessPhone: string;

  @Column({ type: 'varchar', nullable: true })
  jobTitle: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
