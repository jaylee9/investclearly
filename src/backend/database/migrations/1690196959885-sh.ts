import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1690196959885 implements MigrationInterface {
  name = 'Sh1690196959885';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_specialty_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_investment_structure_enum" AS ENUM('Equity', 'Debt', 'Preferred Equity')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_exemption_enum" AS ENUM('506B', '506C')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_region_enum" AS ENUM('US', 'My State', 'Midwest', 'Northeast', 'Northwest', 'Southeast', 'Southwest', 'Southern', 'Western')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_hold_period_enum" AS ENUM('Less than 1 year', '1-2 years', '3-5 years', '6-9 years', '10+ years')`
    );
    await queryRunner.query(
      `CREATE TABLE "sponsors" ("id" SERIAL NOT NULL, "vanity_name" character varying, "legal_name" character varying, "user_id" integer, "business_avatar" character varying, "business_email" character varying, "business_phone" character varying, "sponsor_name" character varying, "address" character varying, "website" character varying, "description" text, "aum" integer, "specialty" "public"."sponsors_specialty_enum", "investment_structure" "public"."sponsors_investment_structure_enum", "facebook_link" character varying, "linked_in_link" character varying, "twitter_link" character varying, "instagram_link" character varying, "exemption" "public"."sponsors_exemption_enum", "work_for_this_company" boolean NOT NULL DEFAULT false, "region" "public"."sponsors_region_enum", "cash_on_cash" integer, "equity_multiple" integer, "hold_period" "public"."sponsors_hold_period_enum", "target_irr" integer, "actual_irr" integer, "fees" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6d1114fe7e65855154351b66bfc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "deals" ADD "sponsor_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "deals" ADD CONSTRAINT "FK_64f9863b930d30affb62b9dd412" FOREIGN KEY ("sponsor_id") REFERENCES "sponsors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD CONSTRAINT "FK_fbc6d68d34dd7eab444f72b8f24" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sponsors" DROP CONSTRAINT "FK_fbc6d68d34dd7eab444f72b8f24"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" DROP CONSTRAINT "FK_64f9863b930d30affb62b9dd412"`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "sponsor_id"`);
    await queryRunner.query(`DROP TABLE "sponsors"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_hold_period_enum"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_region_enum"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_exemption_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."sponsors_investment_structure_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."sponsors_specialty_enum"`);
  }
}
