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
import { PolymorphicParent } from 'typeorm-polymorphic';
import { AssetClasses } from '../constants/enums/asset-classes';
import { Exemptions } from '../constants/enums/exemptions';
import { Regions } from '../constants/enums/regions';
import { User } from './user.entity';
import { Deal } from './deals.entity';
import { InvestmentStructures } from '../constants/enums/investment-structures';
import { Review } from './reviews.entity';
import { Regulations } from '../constants/enums/regulations';
import { Interests } from '../constants/enums/interests';
import { Bookmark } from './bookmark.entity';

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

  @Column({ type: 'enum', array: true, enum: AssetClasses, nullable: true })
  specialties: AssetClasses[] | AssetClasses;

  @Column({
    type: 'enum',
    array: true,
    enum: InvestmentStructures,
    nullable: true,
  })
  investmentStructures: InvestmentStructures[] | InvestmentStructures;

  @Column({ type: 'varchar', nullable: true })
  facebookLink: string;

  @Column({ type: 'varchar', nullable: true })
  linkedInLink: string;

  @Column({ type: 'varchar', nullable: true })
  twitterLink: string;

  @Column({ type: 'varchar', nullable: true })
  instagramLink: string;

  @Column({ type: 'enum', array: true, enum: Exemptions, nullable: true })
  exemptions: Exemptions[] | Exemptions;

  @Column({ type: 'boolean', nullable: false, default: false })
  workForThisCompany: boolean;

  @Column({ type: 'enum', array: true, enum: Regions, nullable: true })
  regions: Regions[] | Regions;

  @Column({ type: 'int', nullable: true })
  cashOnCash: number;

  @Column({ type: 'int', nullable: true })
  equityMultiple: number;

  @Column({ type: 'int', nullable: true })
  holdPeriod: number;

  @Column({ type: 'int', nullable: true })
  targetIRR: number;

  @Column({ type: 'int', nullable: true })
  actualIRR: number;

  @Column({ type: 'int', nullable: true })
  fees: number;

  @Column({ type: 'enum', array: true, enum: Regulations, nullable: true })
  regulations: Regulations[] | Regulations;

  @Column({
    type: 'enum',
    array: true,
    enum: Interests,
    nullable: true,
  })
  interests: Interests[] | Interests;

  activelyRising: boolean;

  dealsCount: number;

  reviewsCount: number;

  avgTotalRating: number;

  isInBookmarks: boolean;

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

  @PolymorphicParent(() => Bookmark, { eager: false, cascade: true })
  bookmarks: Relation<Bookmark[]>;

  @PolymorphicParent(() => Location, { eager: false, cascade: true })
  locations: Relation<Location[]>;
}
