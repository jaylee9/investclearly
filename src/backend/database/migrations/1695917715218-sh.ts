import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1695917715218 implements MigrationInterface {
  name = 'Sh1695917715218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deals_related_persons" ADD CONSTRAINT "FK_cc5249355ed5ae0aeab31c3d6ff" FOREIGN KEY ("deal_id") REFERENCES "deals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "deals_related_persons" ADD CONSTRAINT "FK_39eecba2aa5c874797e3e1f6ff8" FOREIGN KEY ("related_person_id") REFERENCES "related_persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deals_related_persons" DROP CONSTRAINT "FK_39eecba2aa5c874797e3e1f6ff8"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals_related_persons" DROP CONSTRAINT "FK_cc5249355ed5ae0aeab31c3d6ff"`
    );
  }
}
