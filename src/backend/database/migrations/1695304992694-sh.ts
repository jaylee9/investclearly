import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1695304992694 implements MigrationInterface {
  name = 'Sh1695304992694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "year_of_foundation" integer`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sponsors" DROP COLUMN "year_of_foundation"`
    );
  }
}
