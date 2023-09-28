import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  OneToMany,
} from 'typeorm';
import { PolymorphicParent } from 'typeorm-polymorphic';
import { Location } from './locations.entity';
import { DealsRelatedPersons } from './dealsRelatedPersons.entity';

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

  @Column({ type: 'varchar', nullable: true })
  relationshipClarification: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @PolymorphicParent(() => Location, { eager: false, cascade: true })
  locations: Relation<Location[]>;

  @OneToMany(
    () => DealsRelatedPersons,
    dealsRelatedPerson => dealsRelatedPerson.relatedPerson
  )
  dealRelatedPersons: Relation<DealsRelatedPersons>[];
}
