import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1693409937472 implements MigrationInterface {
  name = 'Sh1693409937472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "preferred_return" integer`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "preferred_return"`
    );
  }
}
