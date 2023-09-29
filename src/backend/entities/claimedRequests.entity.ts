import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  ManyToOne,
} from 'typeorm';
import { ClaimTypes } from '../constants/enums/claim-types';
import { ClaimEntityTypes } from '../constants/enums/claim-entity-types';
import { User } from './user.entity';

@Entity('claimed_requests')
export class ClaimedRequests {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: false })
  entityId: number;

  @Column({ type: 'enum', enum: ClaimEntityTypes, nullable: false })
  entityType: string;

  @Column({ type: 'enum', enum: ClaimTypes, nullable: false })
  claimType: string;

  @Column({ type: 'varchar', nullable: false })
  businessEmail: string;

  @Column({ type: 'varchar', nullable: false })
  businessPhone: string;

  @Column({ type: 'varchar', nullable: false })
  jobTitle: string;

  @Column({ type: 'text', nullable: false })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.claimedRequests)
  user: Relation<User>;
}
