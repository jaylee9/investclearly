import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1695131886403 implements MigrationInterface {
  name = 'Sh1695131886403';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attachments" ADD "original_file_name" character varying`
    );
    await queryRunner.query(`ALTER TABLE "attachments" ADD "file_size" bigint`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attachments" DROP COLUMN "file_size"`
    );
    await queryRunner.query(
      `ALTER TABLE "attachments" DROP COLUMN "original_file_name"`
    );
  }
}
