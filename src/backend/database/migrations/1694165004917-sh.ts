import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1694165004917 implements MigrationInterface {
  name = 'Sh1694165004917';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" SERIAL NOT NULL, "entity_id" integer NOT NULL, "entity_type" character varying NOT NULL, "street1" character varying, "street2" character varying, "city" character varying, "state_or_country" character varying, "state_or_country_description" character varying, "zip_code" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "related_persons" ("id" SERIAL NOT NULL, "first_name" character varying, "middle_name" character varying, "last_name" character varying, "relationships" character varying array, "relationship_clarification" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af149a4ea677edfd5188d761c85" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "related_persons"`);
    await queryRunner.query(`DROP TABLE "locations"`);
  }
}
