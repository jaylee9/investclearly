import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { PolymorphicChildInterface } from 'typeorm-polymorphic/dist/polymorphic.interface';

@Entity('bookmarks')
export class Bookmark implements PolymorphicChildInterface {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  entityId: number;

  @Column({ type: 'varchar', nullable: false })
  entityType: string;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @ManyToOne(() => User, { onDelete: 'NO ACTION' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
