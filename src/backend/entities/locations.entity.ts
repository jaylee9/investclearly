import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';

@Entity('locations')
export class Location implements PolymorphicChildInterface {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  entityId: number;

  @Column({ type: 'varchar', nullable: false })
  entityType: string;

  @Column({ type: 'varchar', nullable: true })
  street1: string;

  @Column({ type: 'varchar', nullable: true })
  street2: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  stateOrCountry: string;

  @Column({ type: 'varchar', nullable: true })
  stateOrCountryDescription: string;

  @Column({ type: 'varchar', nullable: true })
  zipCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
