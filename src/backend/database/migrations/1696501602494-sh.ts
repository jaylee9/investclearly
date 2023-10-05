import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1696501602494 implements MigrationInterface {
  name = 'Sh1696501602494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."deals_investment_structures_enum" RENAME TO "deals_investment_structures_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_investment_structures_enum" AS ENUM('Equity', 'Debt')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ALTER COLUMN "investment_structures" TYPE "public"."deals_investment_structures_enum"[] USING "investment_structures"::"text"::"public"."deals_investment_structures_enum"[]`
    );
    await queryRunner.query(
      `DROP TYPE "public"."deals_investment_structures_enum_old"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."sponsors_investment_structures_enum" RENAME TO "sponsors_investment_structures_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_investment_structures_enum" AS ENUM('Equity', 'Debt')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ALTER COLUMN "investment_structures" TYPE "public"."sponsors_investment_structures_enum"[] USING "investment_structures"::"text"::"public"."sponsors_investment_structures_enum"[]`
    );
    await queryRunner.query(
      `DROP TYPE "public"."sponsors_investment_structures_enum_old"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_investment_structures_enum_old" AS ENUM('Equity', 'Debt', 'Preferred Equity')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ALTER COLUMN "investment_structures" TYPE "public"."sponsors_investment_structures_enum_old"[] USING "investment_structures"::"text"::"public"."sponsors_investment_structures_enum_old"[]`
    );
    await queryRunner.query(
      `DROP TYPE "public"."sponsors_investment_structures_enum"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."sponsors_investment_structures_enum_old" RENAME TO "sponsors_investment_structures_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_investment_structures_enum_old" AS ENUM('Equity', 'Debt', 'Preferred Equity')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ALTER COLUMN "investment_structures" TYPE "public"."deals_investment_structures_enum_old"[] USING "investment_structures"::"text"::"public"."deals_investment_structures_enum_old"[]`
    );
    await queryRunner.query(
      `DROP TYPE "public"."deals_investment_structures_enum"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."deals_investment_structures_enum_old" RENAME TO "deals_investment_structures_enum"`
    );
  }
}
