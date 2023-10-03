import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1695982039848 implements MigrationInterface {
  name = 'Sh1695982039848';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."claimed_requests_entity_type_enum" AS ENUM('Sponsor', 'Deal')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."claimed_requests_claim_type_enum" AS ENUM('Claim deal', 'Suggest edit deal', 'Claim sponsor profile')`
    );
    await queryRunner.query(
      `CREATE TABLE "claimed_requests" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "entity_id" integer NOT NULL, "entity_type" "public"."claimed_requests_entity_type_enum" NOT NULL, "claim_type" "public"."claimed_requests_claim_type_enum" NOT NULL, "business_email" character varying NOT NULL, "business_phone" character varying NOT NULL, "job_title" character varying NOT NULL, "message" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6d86f83849b8a76fe6f931b2b99" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "claimed_requests" ADD CONSTRAINT "FK_4dede72234411dfdacf10b9ab9a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "claimed_requests" DROP CONSTRAINT "FK_4dede72234411dfdacf10b9ab9a"`
    );
    await queryRunner.query(`DROP TABLE "claimed_requests"`);
    await queryRunner.query(
      `DROP TYPE "public"."claimed_requests_claim_type_enum"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."claimed_requests_entity_type_enum"`
    );
  }
}
