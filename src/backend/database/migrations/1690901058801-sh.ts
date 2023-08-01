import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1690901058801 implements MigrationInterface {
  name = 'Sh1690901058801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."reviews_status_enum" AS ENUM('published', 'on moderation', 'rejected')`
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "sponsor_id" integer NOT NULL, "deal_id" integer, "reviewer_id" integer NOT NULL, "title" character varying NOT NULL, "pre_investment_communication_rating" integer, "pre_investment_communication_comment" text, "post_investment_communication_rating" integer, "post_investment_communication_comment" text, "strength_of_leadership_team_rating" integer, "strength_of_leadership_team_comment" text, "alignment_of_expectations_rating" integer, "alignment_of_expectations_comment" text, "overall_rating" integer NOT NULL, "overall_comment" text NOT NULL, "status" "public"."reviews_status_enum" NOT NULL DEFAULT 'on moderation', "is_verified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_d0ef1f0b8add7936cf1053d0a84" FOREIGN KEY ("sponsor_id") REFERENCES "sponsors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_4df25cb31458103d57cfc40bc30" FOREIGN KEY ("deal_id") REFERENCES "deals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_92e950a2513a79bb3fab273c92e" FOREIGN KEY ("reviewer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_92e950a2513a79bb3fab273c92e"`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_4df25cb31458103d57cfc40bc30"`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_d0ef1f0b8add7936cf1053d0a84"`
    );
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TYPE "public"."reviews_status_enum"`);
  }
}
