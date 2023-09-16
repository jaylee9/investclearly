import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
} from 'typeorm';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { Sponsor } from './sponsors.entity';
import { Attachment } from './attachments.entity';
import { ReviewStatuses } from '../constants/enums/review-statuses';
import { Deal } from './deals.entity';
import { User } from './user.entity';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  sponsorId: number;

  @Column({ type: 'int', nullable: true })
  dealId: number;

  @Column({ type: 'int', nullable: false })
  reviewerId: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'int', nullable: true })
  preInvestmentCommunicationRating: number;

  @Column({ type: 'text', nullable: true })
  preInvestmentCommunicationComment: string;

  @Column({ type: 'int', nullable: true })
  postInvestmentCommunicationRating: number;

  @Column({ type: 'text', nullable: true })
  postInvestmentCommunicationComment: string;

  @Column({ type: 'int', nullable: true })
  strengthOfLeadershipTeamRating: number;

  @Column({ type: 'text', nullable: true })
  strengthOfLeadershipTeamComment: string;

  @Column({ type: 'int', nullable: true })
  alignmentOfExpectationsRating: number;

  @Column({ type: 'text', nullable: true })
  alignmentOfExpectationsComment: string;

  @Column({ type: 'int', nullable: false })
  overallRating: number;

  @Column({ type: 'text', nullable: false })
  overallComment: string;

  @Column({
    type: 'enum',
    enum: ReviewStatuses,
    default: ReviewStatuses.onModeration,
  })
  status: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Sponsor)
  sponsor: Relation<Sponsor>;

  @ManyToOne(() => Deal)
  deal: Relation<Deal>;

  @ManyToOne(() => User)
  reviewer: Relation<User>;

  @PolymorphicParent(() => Attachment, { eager: false, cascade: true })
  attachments: Relation<Attachment[]>;
}
