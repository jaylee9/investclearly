import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
} from 'typeorm';
import { PolymorphicParent } from 'typeorm-polymorphic';

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
}
