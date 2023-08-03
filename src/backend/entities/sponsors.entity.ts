import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { AssetClasses } from '../constants/enums/asset-classes';
import { Exemptions } from '../constants/enums/exemptions';
import { Regions } from '../constants/enums/regions';
import { HoldPeriods } from '../constants/enums/hold-periods';
import { User } from './user.entity';
import { Deal } from './deals.entity';
import { InvestmentStructures } from '../constants/enums/investment-structures';
import { Review } from './reviews.entity';

@Entity({ name: 'sponsors' })
export class Sponsor {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  vanityName: string;

  @Column({ type: 'varchar', nullable: true })
  legalName: string;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @Column({ type: 'varchar', nullable: true })
  businessAvatar: string;

  @Column({ type: 'varchar', nullable: true })
  businessEmail: string;

  @Column({ type: 'varchar', nullable: true })
  businessPhone: string;

  @Column({ type: 'varchar', nullable: true })
  sponsorName: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  aum: number;

  @Column({ type: 'enum', enum: AssetClasses, nullable: true })
  specialty: string;

  @Column({ type: 'enum', enum: InvestmentStructures, nullable: true })
  investmentStructure: string;

  @Column({ type: 'varchar', nullable: true })
  facebookLink: string;

  @Column({ type: 'varchar', nullable: true })
  linkedInLink: string;

  @Column({ type: 'varchar', nullable: true })
  twitterLink: string;

  @Column({ type: 'varchar', nullable: true })
  instagramLink: string;

  @Column({ type: 'enum', enum: Exemptions, nullable: true })
  exemption: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  workForThisCompany: boolean;

  @Column({ type: 'enum', enum: Regions, nullable: true })
  region: string;

  @Column({ type: 'int', nullable: true })
  cashOnCash: number;

  @Column({ type: 'int', nullable: true })
  equityMultiple: number;

  @Column({ type: 'enum', enum: HoldPeriods, nullable: true })
  holdPeriod: string;

  @Column({ type: 'int', nullable: true })
  targetIRR: number;

  @Column({ type: 'int', nullable: true })
  actualIRR: number;

  @Column({ type: 'int', nullable: true })
  fees: number;

  activelyRising: boolean;

  dealscount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: Relation<User>;

  @OneToMany(() => Deal, deals => deals.sponsor)
  deals: Relation<Deal>[];

  @OneToMany(() => Review, reviews => reviews.sponsor)
  reviews: Relation<Review>[];
}
