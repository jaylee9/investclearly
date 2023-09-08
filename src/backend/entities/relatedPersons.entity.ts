import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { Deal } from './deals.entity';

@Entity({ name: 'related_persons' })
export class RelatedPerson {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  middleName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  relationships: string[];

  @Column({ type: 'varchar', nullable: true })
  relationshipClarification: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @PolymorphicParent(() => Location, { eager: false, cascade: true })
  locations: Relation<Location[]>;

  @ManyToMany(() => Deal, Deal => Deal.relatedPersons, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'deal_related_persons',
    joinColumn: {
      name: 'related_person_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'deal_id',
      referencedColumnName: 'id',
    },
  })
  deals: Deal[];
}
