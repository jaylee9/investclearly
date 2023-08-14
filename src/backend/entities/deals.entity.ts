import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
  OneToMany,
} from 'typeorm';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { DealStatuses } from '../constants/enums/deal-statuses';
import { AssetClasses } from '../constants/enums/asset-classes';
import { InvestmentStructures } from '../constants/enums/investment-structures';
import { Regions } from '../constants/enums/regions';
import { Exemptions } from '../constants/enums/exemptions';
import { Sponsor } from './sponsors.entity';
import { Attachment } from './attachments.entity';
import { Review } from './reviews.entity';
import { SecIndustries } from '../constants/enums/sec-industries';
import { Regulations } from '../constants/enums/regulations';

@Entity({ name: 'deals' })
export class Deal {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: true })
  sponsorId: number;

  @Column({ type: 'varchar', nullable: true })
  dealTitle: string;

  @Column({ type: 'varchar', nullable: true })
  dealAddress: string;

  @Column({ type: 'enum', array: true, enum: Regions, nullable: true })
  regions: Regions[] | Regions;

  @Column({ type: 'enum', enum: DealStatuses, nullable: true })
  status: string;

  @Column({ type: 'enum', enum: AssetClasses, nullable: true })
  assetClass: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  minimumInvestment: number;

  @Column({ type: 'int', nullable: true })
  cashOnCash: number;

  @Column({
    type: 'enum',
    array: true,
    enum: InvestmentStructures,
    nullable: true,
  })
  investmentStructures: InvestmentStructures[] | InvestmentStructures;

  @Column({ type: 'int', nullable: true })
  fees: number;

  @Column({ type: 'int', nullable: true })
  targetRaise: number;

  @Column({ type: 'int', nullable: true })
  equityMultiple: number;

  @Column({ type: 'int', nullable: true })
  holdPeriod: number;

  @Column({ type: 'int', nullable: true })
  targetIRR: number;

  @Column({ type: 'int', nullable: true })
  actualIRR: number;

  @Column({ type: 'varchar', nullable: true })
  dealLegalName: string;

  @Column({ type: 'varchar', nullable: true })
  dealSponsor: string;

  @Column({ type: 'enum', enum: Exemptions, nullable: true })
  exemption: string;

  @Column({ type: 'enum', enum: SecIndustries, nullable: true })
  secIndustry: string;

  @Column({ type: 'date', nullable: true })
  closeDate: Date;

  @Column({ type: 'enum', enum: Regulations, nullable: true })
  regulation: string;

  reviewsCount: number;

  avgTotalRating: number;

  attachmentsIdsToDelete: number | number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Sponsor, sponsors => sponsors.deals)
  sponsor: Relation<Sponsor>;

  @OneToMany(() => Review, reviews => reviews.deal)
  reviews: Relation<Review>[];

  @PolymorphicParent(() => Attachment, { eager: false, cascade: true })
  attachments: Relation<Attachment[]>;
}
