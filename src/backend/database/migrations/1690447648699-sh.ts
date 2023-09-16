import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1690447648699 implements MigrationInterface {
  name = 'Sh1690447648699';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "attachments" ("id" SERIAL NOT NULL, "entity_id" integer NOT NULL, "entity_type" character varying NOT NULL, "path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "attachments"`);
  }
}
