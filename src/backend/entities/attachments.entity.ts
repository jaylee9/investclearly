import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';

@Entity('attachments')
export class Attachment implements PolymorphicChildInterface {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  entityId: number;

  @Column({ type: 'varchar', nullable: false })
  entityType: string;

  @Column({ type: 'varchar', nullable: true })
  originalFileName: string;

  @Column({ type: 'bigint', nullable: true })
  fileSize: number;

  @Column({ name: 'path', type: 'varchar', nullable: false })
  path: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
