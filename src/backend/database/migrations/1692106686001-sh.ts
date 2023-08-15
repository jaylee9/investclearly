import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1692106686001 implements MigrationInterface {
  name = 'Sh1692106686001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."investments_status_enum" AS ENUM('active', 'completed')`
    );
    await queryRunner.query(
      `CREATE TABLE "investments" ("id" SERIAL NOT NULL, "deal_id" integer NOT NULL, "user_id" integer NOT NULL, "date_of_investment" date, "total_invested" integer, "status" "public"."investments_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a1263853f1a4fb8b849c1c9aff4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_fe9d6987f15c1cce3ff55dd25e2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "investments" ADD CONSTRAINT "FK_d7df28d64beea1bdd93ec5639b1" FOREIGN KEY ("deal_id") REFERENCES "deals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_d7df28d64beea1bdd93ec5639b1"`
    );
    await queryRunner.query(
      `ALTER TABLE "investments" DROP CONSTRAINT "FK_fe9d6987f15c1cce3ff55dd25e2"`
    );
    await queryRunner.query(`DROP TABLE "investments"`);
    await queryRunner.query(`DROP TYPE "public"."investments_status_enum"`);
  }
}
