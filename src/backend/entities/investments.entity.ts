import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  ManyToOne,
} from 'typeorm';
import { InvestmentStatuses } from '../constants/enums/investment-statuses';
import { User } from './user.entity';
import { Deal } from './deals.entity';

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  dealId: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'date', nullable: false })
  dateOfInvestment: Date;

  @Column({ type: 'int', nullable: false })
  totalInvested: number;

  @Column({
    type: 'enum',
    enum: InvestmentStatuses,
    default: InvestmentStatuses.active,
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, users => users.investments)
  user: Relation<User>;

  @ManyToOne(() => Deal, deals => deals.investments)
  deal: Relation<Deal>;
}
