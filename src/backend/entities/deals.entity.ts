import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
} from 'typeorm';
import { DealStatuses } from '../constants/enums/deal-statuses';
import { AssetClasses } from '../constants/enums/asset-classes';
import { InvestmentStructures } from '../constants/enums/investment-structures';
import { HoldPeriods } from '../constants/enums/hold-periods';
import { Regions } from '../constants/enums/regions';
import { Exemptions } from '../constants/enums/exemptions';
import { Sponsor } from './sponsors.entity';

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

  @Column({ type: 'enum', enum: Regions, nullable: true })
  region: string;

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

  @Column({ type: 'enum', enum: InvestmentStructures, nullable: true })
  investmentStructure: string;

  @Column({ type: 'int', nullable: true })
  fees: number;

  @Column({ type: 'int', nullable: true })
  targetRaise: number;

  @Column({ type: 'int', nullable: true })
  equityMultiple: number;

  @Column({ type: 'enum', enum: HoldPeriods, nullable: true })
  holdPeriod: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Sponsor, sponsors => sponsors.deals)
  sponsor: Relation<Sponsor>;
}
