import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1697216828518 implements MigrationInterface {
  name = 'Sh1697216828518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "aum"`);
    await queryRunner.query(`ALTER TABLE "sponsors" ADD "aum" bigint`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "aum"`);
    await queryRunner.query(`ALTER TABLE "sponsors" ADD "aum" integer`);
  }
}
