import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
} from 'typeorm';
import { RelatedPerson } from './relatedPersons.entity';
import { Deal } from './deals.entity';

@Entity('deals_related_persons')
export class DealsRelatedPersons {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  dealId: number;

  @Column({ type: 'int', nullable: false })
  relatedPersonId: number;

  @Column({ type: 'varchar', array: true, nullable: true })
  relatedPersonRoles: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Deal, deal => deal.dealsRelatedPersons)
  deal: Relation<Deal>;

  @ManyToOne(
    () => RelatedPerson,
    relatedPerson => relatedPerson.dealsRelatedPersons
  )
  relatedPerson: Relation<RelatedPerson>;
}
