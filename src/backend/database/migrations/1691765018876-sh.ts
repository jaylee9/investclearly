import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1691765018876 implements MigrationInterface {
  name = 'Sh1691765018876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "investment_structure"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."deals_investment_structure_enum"`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "region"`);
    await queryRunner.query(`DROP TYPE "public"."deals_region_enum"`);
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "region"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_region_enum"`);
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "exemption"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_exemption_enum"`);
    await queryRunner.query(
      `ALTER TABLE "sponsors" DROP COLUMN "investment_structure"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."sponsors_investment_structure_enum"`
    );
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "specialty"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_specialty_enum"`);
    await queryRunner.query(
      `CREATE TYPE "public"."deals_regions_enum" AS ENUM('US', 'My State', 'Midwest', 'Northeast', 'Northwest', 'Southeast', 'Southwest', 'Southern', 'Western')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "regions" "public"."deals_regions_enum" array`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_investment_structures_enum" AS ENUM('Equity', 'Debt', 'Preferred Equity')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "investment_structures" "public"."deals_investment_structures_enum" array`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_sec_industry_enum" AS ENUM('Pooled Investment Fund', 'Commercial', 'Construction', 'REITs & Finance Residential', 'Other Real Estate', 'Other', 'Lodging & Conventions')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "sec_industry" "public"."deals_sec_industry_enum"`
    );
    await queryRunner.query(`ALTER TABLE "deals" ADD "close_date" date`);
    await queryRunner.query(
      `CREATE TYPE "public"."deals_regulation_enum" AS ENUM('A', 'D')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "regulation" "public"."deals_regulation_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_specialties_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "specialties" "public"."sponsors_specialties_enum" array`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_investment_structures_enum" AS ENUM('Equity', 'Debt', 'Preferred Equity')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "investment_structures" "public"."sponsors_investment_structures_enum" array`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_exemptions_enum" AS ENUM('506B', '506C')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "exemptions" "public"."sponsors_exemptions_enum" array`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_regions_enum" AS ENUM('US', 'My State', 'Midwest', 'Northeast', 'Northwest', 'Southeast', 'Southwest', 'Southern', 'Western')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "regions" "public"."sponsors_regions_enum" array`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_regulations_enum" AS ENUM('A', 'D')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "regulations" "public"."sponsors_regulations_enum" array`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_interests_enum" AS ENUM('Accredited', 'Qualified Purchaser', 'Family Office', 'Institution')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "interests" "public"."sponsors_interests_enum" array`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "hold_period"`);
    await queryRunner.query(`DROP TYPE "public"."deals_hold_period_enum"`);
    await queryRunner.query(`ALTER TABLE "deals" ADD "hold_period" integer`);
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "hold_period"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_hold_period_enum"`);
    await queryRunner.query(`ALTER TABLE "sponsors" ADD "hold_period" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "hold_period"`);
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_hold_period_enum" AS ENUM('1-2 years', '10+ years', '3-5 years', '6-9 years', 'Less than 1 year')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "hold_period" "public"."sponsors_hold_period_enum"`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "hold_period"`);
    await queryRunner.query(
      `CREATE TYPE "public"."deals_hold_period_enum" AS ENUM('1-2 years', '10+ years', '3-5 years', '6-9 years', 'Less than 1 year')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "hold_period" "public"."deals_hold_period_enum"`
    );
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "interests"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_interests_enum"`);
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "regulations"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_regulations_enum"`);
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "regions"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_regions_enum"`);
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "exemptions"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_exemptions_enum"`);
    await queryRunner.query(
      `ALTER TABLE "sponsors" DROP COLUMN "investment_structures"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."sponsors_investment_structures_enum"`
    );
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "specialties"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_specialties_enum"`);
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "regulation"`);
    await queryRunner.query(`DROP TYPE "public"."deals_regulation_enum"`);
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "close_date"`);
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "sec_industry"`);
    await queryRunner.query(`DROP TYPE "public"."deals_sec_industry_enum"`);
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "investment_structures"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."deals_investment_structures_enum"`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "regions"`);
    await queryRunner.query(`DROP TYPE "public"."deals_regions_enum"`);
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_specialty_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Mobile Home', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "specialty" "public"."sponsors_specialty_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_investment_structure_enum" AS ENUM('Debt', 'Equity', 'Preferred Equity')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "investment_structure" "public"."sponsors_investment_structure_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_exemption_enum" AS ENUM('506B', '506C')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "exemption" "public"."sponsors_exemption_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_region_enum" AS ENUM('Midwest', 'My State', 'Northeast', 'Northwest', 'Southeast', 'Southern', 'Southwest', 'US', 'Western')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "region" "public"."sponsors_region_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_region_enum" AS ENUM('Midwest', 'My State', 'Northeast', 'Northwest', 'Southeast', 'Southern', 'Southwest', 'US', 'Western')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "region" "public"."deals_region_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_investment_structure_enum" AS ENUM('Debt', 'Equity', 'Preferred Equity')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "investment_structure" "public"."deals_investment_structure_enum"`
    );
  }
}
