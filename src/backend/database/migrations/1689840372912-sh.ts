import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1689840372912 implements MigrationInterface {
  name = 'Sh1689840372912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."deals_region_enum" AS ENUM('US', 'My State', 'Midwest', 'Northeast', 'Northwest', 'Southeast', 'Southwest', 'Southern', 'Western')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_status_enum" AS ENUM('Open', 'Closed-Active', 'Full cycle')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_asset_class_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_investment_structure_enum" AS ENUM('Equity', 'Debt', 'Preferred Equity')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_hold_period_enum" AS ENUM('Less than 1 year', '1-2 years', '3-5 years', '6-9 years', '10+ years')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_exemption_enum" AS ENUM('506B', '506C')`
    );
    await queryRunner.query(
      `CREATE TABLE "deals" ("id" SERIAL NOT NULL, "deal_title" character varying, "deal_address" character varying, "region" "public"."deals_region_enum", "status" "public"."deals_status_enum", "asset_class" "public"."deals_asset_class_enum", "description" text, "minimum_investment" integer, "cash_on_cash" integer, "investment_structure" "public"."deals_investment_structure_enum", "fees" integer, "target_raise" integer, "equity_multiple" integer, "hold_period" "public"."deals_hold_period_enum", "target_irr" integer, "actual_irr" integer, "deal_legal_name" character varying, "deal_sponsor" character varying, "exemption" "public"."deals_exemption_enum", "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8c66f03b250f613ff8615940b4b" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "deals"`);
    await queryRunner.query(`DROP TYPE "public"."deals_exemption_enum"`);
    await queryRunner.query(`DROP TYPE "public"."deals_hold_period_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."deals_investment_structure_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."deals_asset_class_enum"`);
    await queryRunner.query(`DROP TYPE "public"."deals_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."deals_region_enum"`);
  }
}
