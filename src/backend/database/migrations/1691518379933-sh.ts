import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1691518379933 implements MigrationInterface {
  name = 'Sh1691518379933';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "address" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "total_invested_amount_visibility" boolean NOT NULL DEFAULT true`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "your_deals_visibility" boolean NOT NULL DEFAULT true`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "weekly_digest_email" boolean NOT NULL DEFAULT true`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "review_was_published_after_moderation_email" boolean NOT NULL DEFAULT true`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "review_was_declined_after_moderation_email" boolean NOT NULL DEFAULT true`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "new_deal_mathing_your_investment_preferences_email" boolean NOT NULL DEFAULT true`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "new_deal_from_the_sponsor_you_saved_email" boolean NOT NULL DEFAULT true`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "new_review_has_been_shared_to_sponsor_email" boolean NOT NULL DEFAULT true`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_investor_status_enum" AS ENUM('Accredited Investor', 'Not Accredited Investor')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "investor_status" "public"."user_investor_status_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_income_and_net_worth_enum" AS ENUM('Yes, I have', 'No, I do not have')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "income_and_net_worth" "public"."user_income_and_net_worth_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_asset_classes_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "asset_classes" "public"."user_asset_classes_enum" array`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_regions_enum" AS ENUM('US', 'My State', 'Midwest', 'Northeast', 'Northwest', 'Southeast', 'Southwest', 'Southern', 'Western')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "regions" "public"."user_regions_enum" array`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "minimum_investment_min" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "minimum_investment_max" integer`
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "hold_period_min" integer`);
    await queryRunner.query(`ALTER TABLE "user" ADD "hold_period_max" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hold_period_max"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hold_period_min"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "minimum_investment_max"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "minimum_investment_min"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "regions"`);
    await queryRunner.query(`DROP TYPE "public"."user_regions_enum"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "asset_classes"`);
    await queryRunner.query(`DROP TYPE "public"."user_asset_classes_enum"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "income_and_net_worth"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."user_income_and_net_worth_enum"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "investor_status"`);
    await queryRunner.query(`DROP TYPE "public"."user_investor_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "new_review_has_been_shared_to_sponsor_email"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "new_deal_from_the_sponsor_you_saved_email"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "new_deal_mathing_your_investment_preferences_email"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "review_was_declined_after_moderation_email"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "review_was_published_after_moderation_email"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "weekly_digest_email"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "your_deals_visibility"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "total_invested_amount_visibility"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
  }
}
