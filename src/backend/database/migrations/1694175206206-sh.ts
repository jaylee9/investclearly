import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1694175206206 implements MigrationInterface {
  name = 'Sh1694175206206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "related_persons" ("id" SERIAL NOT NULL, "first_name" character varying, "middle_name" character varying, "last_name" character varying, "relationships" character varying array, "relationship_clarification" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af149a4ea677edfd5188d761c85" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "related_persons"`);
  }
}
