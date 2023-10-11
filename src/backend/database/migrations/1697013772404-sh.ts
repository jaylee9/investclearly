import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1697013772404 implements MigrationInterface {
  name = 'Sh1697013772404';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deals" RENAME COLUMN "deal_title" TO "vanity_name"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."deals_status_enum" RENAME TO "deals_status_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_status_enum" AS ENUM('Active', 'Closed')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ALTER COLUMN "status" TYPE "public"."deals_status_enum" USING "status"::"text"::"public"."deals_status_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."deals_status_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."deals_asset_class_enum" RENAME TO "deals_asset_class_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_asset_class_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home', 'Offering Data/Industry Group', 'Pooled Investment Fund', 'Commercial', 'Construction', 'REITs & Finance', 'Residential', 'Other Real Estate', 'Other', 'Lodging & Conventions')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ALTER COLUMN "asset_class" TYPE "public"."deals_asset_class_enum" USING "asset_class"::"text"::"public"."deals_asset_class_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."deals_asset_class_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."sponsors_specialties_enum" RENAME TO "sponsors_specialties_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_specialties_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home', 'Offering Data/Industry Group', 'Pooled Investment Fund', 'Commercial', 'Construction', 'REITs & Finance', 'Residential', 'Other Real Estate', 'Other', 'Lodging & Conventions')`
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
      `CREATE TYPE "public"."user_asset_classes_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home', 'Offering Data/Industry Group', 'Pooled Investment Fund', 'Commercial', 'Construction', 'REITs & Finance', 'Residential', 'Other Real Estate', 'Other', 'Lodging & Conventions')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "asset_classes" TYPE "public"."user_asset_classes_enum"[] USING "asset_classes"::"text"::"public"."user_asset_classes_enum"[]`
    );
    await queryRunner.query(`DROP TYPE "public"."user_asset_classes_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_asset_classes_enum_old" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home', 'Offering Data/Industry Group')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "asset_classes" TYPE "public"."user_asset_classes_enum_old"[] USING "asset_classes"::"text"::"public"."user_asset_classes_enum_old"[]`
    );
    await queryRunner.query(`DROP TYPE "public"."user_asset_classes_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."user_asset_classes_enum_old" RENAME TO "user_asset_classes_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_specialties_enum_old" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home', 'Offering Data/Industry Group')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ALTER COLUMN "specialties" TYPE "public"."sponsors_specialties_enum_old"[] USING "specialties"::"text"::"public"."sponsors_specialties_enum_old"[]`
    );
    await queryRunner.query(`DROP TYPE "public"."sponsors_specialties_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."sponsors_specialties_enum_old" RENAME TO "sponsors_specialties_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_asset_class_enum_old" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home', 'Offering Data/Industry Group')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ALTER COLUMN "asset_class" TYPE "public"."deals_asset_class_enum_old" USING "asset_class"::"text"::"public"."deals_asset_class_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."deals_asset_class_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."deals_asset_class_enum_old" RENAME TO "deals_asset_class_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_status_enum_old" AS ENUM('Open', 'Closed-Active', 'Full cycle')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ALTER COLUMN "status" TYPE "public"."deals_status_enum_old" USING "status"::"text"::"public"."deals_status_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."deals_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."deals_status_enum_old" RENAME TO "deals_status_enum"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" RENAME COLUMN "vanity_name" TO "deal_title"`
    );
  }
}
