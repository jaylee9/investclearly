import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1695055668731 implements MigrationInterface {
  name = 'Sh1695055668731';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_password_added" boolean NOT NULL DEFAULT true`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "is_password_added"`
    );
  }
}
