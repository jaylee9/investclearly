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
import * as bcrypt from 'bcryptjs';
import { Sponsor } from './sponsors.entity';

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

  public comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }

  @OneToMany(() => Sponsor, sponsors => sponsors.user)
  sponsors: Relation<Sponsor[]>;
}
