import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1699637885385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "deals"
        SET "is_deal_published" = FALSE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "deals"
        SET "is_deal_published" = TRUE`
    );
  }
}
