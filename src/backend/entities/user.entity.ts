import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Relation,
} from 'typeorm';
import { PolymorphicParent } from 'typeorm-polymorphic';
import * as bcrypt from 'bcryptjs';
import { Sponsor } from './sponsors.entity';
import { Review } from './reviews.entity';
import { AssetClasses } from '../constants/enums/asset-classes';
import { Regions } from '../constants/enums/regions';
import { InvestorStatuses } from '../constants/enums/investor-statuses';
import { IncomeAndNetWorth } from '../constants/enums/income-and-worth';
import { Investment } from './investments.entity';
import { Bookmark } from './bookmark.entity';
import { Location } from './locations.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  emailConfirmationCode: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  profilePicture: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  googleId: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  totalInvestedAmountVisibility: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  yourDealsVisibility: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  weeklyDigestEmail: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  reviewWasPublishedAfterModerationEmail: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  reviewWasDeclinedAfterModerationEmail: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  newDealMathingYourInvestmentPreferencesEmail: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  newDealFromTheSponsorYouSavedEmail: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  newReviewHasBeenSharedToSponsorEmail: boolean;

  @Column({ type: 'enum', enum: InvestorStatuses, nullable: true })
  investorStatus: string;

  @Column({ type: 'enum', enum: IncomeAndNetWorth, nullable: true })
  incomeAndNetWorth: string;

  @Column({ type: 'enum', array: true, enum: AssetClasses, nullable: true })
  assetClasses: AssetClasses[];

  @Column({ type: 'enum', array: true, enum: Regions, nullable: true })
  regions: Regions[];

  @Column({ type: 'int', nullable: true })
  minimumInvestmentMin: number;

  @Column({ type: 'int', nullable: true })
  minimumInvestmentMax: number;

  @Column({ type: 'int', nullable: true })
  holdPeriodMin: number;

  @Column({ type: 'int', nullable: true })
  holdPeriodMax: number;

  reviewsCount: number;

  investmentsCount: number;

  @Column({ type: 'boolean', nullable: false, default: true })
  isPasswordAdded: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  public async beforeInsert() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }

    this.email = this.email.toLowerCase();
  }

  @OneToMany(() => Sponsor, sponsors => sponsors.user)
  sponsors: Relation<Sponsor>[];

  @OneToMany(() => Review, reviews => reviews.reviewer)
  reviews: Relation<Review>[];

  @OneToMany(() => Investment, investments => investments.user)
  investments: Relation<Investment>[];

  @OneToMany(() => Bookmark, bookmarks => bookmarks.user)
  bookmarks: Relation<Bookmark>[];

  @PolymorphicParent(() => Location, { eager: false, cascade: true })
  locations: Relation<Location[]>;
}
