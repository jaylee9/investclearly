import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1694610081644 implements MigrationInterface {
  name = 'Sh1694610081644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "sec_api_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "accession_number" character varying`
    );
    await queryRunner.query(`ALTER TABLE "deals" ADD "file_date" date`);
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "submission_type" character varying`
    );
    await queryRunner.query(`ALTER TABLE "deals" ADD "cik" character varying`);
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "previous_names" character varying array`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "entity_type" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "years_of_incorporation" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "issuer_phone_number" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "jurisdiction_of_inc" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "date_of_first_sale" date`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "is_more_than_one_year" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "is_deal_published" boolean NOT NULL DEFAULT true`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."deals_asset_class_enum" RENAME TO "deals_asset_class_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_asset_class_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home', 'Industry from SEC')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ALTER COLUMN "asset_class" TYPE "public"."deals_asset_class_enum" USING "asset_class"::"text"::"public"."deals_asset_class_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."deals_asset_class_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "minimum_investment"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "minimum_investment" bigint`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "target_raise"`);
    await queryRunner.query(`ALTER TABLE "deals" ADD "target_raise" bigint`);
    await queryRunner.query(
      `ALTER TYPE "public"."deals_sec_industry_enum" RENAME TO "deals_sec_industry_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_sec_industry_enum" AS ENUM('Pooled Investment Fund', 'Commercial', 'Construction', 'REITs & Finance', 'Residential', 'Other Real Estate', 'Other', 'Lodging & Conventions')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ALTER COLUMN "sec_industry" TYPE "public"."deals_sec_industry_enum" USING "sec_industry"::"text"::"public"."deals_sec_industry_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."deals_sec_industry_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."sponsors_specialties_enum" RENAME TO "sponsors_specialties_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_specialties_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home', 'Industry from SEC')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ALTER COLUMN "specialties" TYPE "public"."sponsors_specialties_enum"[] USING "specialties"::"text"::"public"."sponsors_specialties_enum"[]`
    );
    await queryRunner.query(
      `DROP TYPE "public"."sponsors_specialties_enum_old"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."user_asset_classes_enum" RENAME TO "user_asset_classes_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_asset_classes_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home', 'Industry from SEC')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "asset_classes" TYPE "public"."user_asset_classes_enum"[] USING "asset_classes"::"text"::"public"."user_asset_classes_enum"[]`
    );
    await queryRunner.query(`DROP TYPE "public"."user_asset_classes_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_asset_classes_enum_old" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "asset_classes" TYPE "public"."user_asset_classes_enum_old"[] USING "asset_classes"::"text"::"public"."user_asset_classes_enum_old"[]`
    );
    await queryRunner.query(`DROP TYPE "public"."user_asset_classes_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."user_asset_classes_enum_old" RENAME TO "user_asset_classes_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_specialties_enum_old" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ALTER COLUMN "specialties" TYPE "public"."sponsors_specialties_enum_old"[] USING "specialties"::"text"::"public"."sponsors_specialties_enum_old"[]`
    );
    await queryRunner.query(`DROP TYPE "public"."sponsors_specialties_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."sponsors_specialties_enum_old" RENAME TO "sponsors_specialties_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_sec_industry_enum_old" AS ENUM('Pooled Investment Fund', 'Commercial', 'Construction', 'REITs & Finance Residential', 'Other Real Estate', 'Other', 'Lodging & Conventions')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ALTER COLUMN "sec_industry" TYPE "public"."deals_sec_industry_enum_old" USING "sec_industry"::"text"::"public"."deals_sec_industry_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."deals_sec_industry_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."deals_sec_industry_enum_old" RENAME TO "deals_sec_industry_enum"`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "target_raise"`);
    await queryRunner.query(`ALTER TABLE "deals" ADD "target_raise" integer`);
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "minimum_investment"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "minimum_investment" integer`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_asset_class_enum_old" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ALTER COLUMN "asset_class" TYPE "public"."deals_asset_class_enum_old" USING "asset_class"::"text"::"public"."deals_asset_class_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."deals_asset_class_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."deals_asset_class_enum_old" RENAME TO "deals_asset_class_enum"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "is_deal_published"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "is_more_than_one_year"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "date_of_first_sale"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "jurisdiction_of_inc"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "issuer_phone_number"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "years_of_incorporation"`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "entity_type"`);
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "previous_names"`);
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "cik"`);
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "submission_type"`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "file_date"`);
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "accession_number"`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "sec_api_id"`);
  }
}
