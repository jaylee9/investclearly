import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1699630830270 implements MigrationInterface {
  name = 'Sh1699630830270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sponsors" DROP COLUMN "cash_on_cash"`
    );
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "target_irr"`);
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "actual_irr"`);
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "fees"`);
    await queryRunner.query(
      `ALTER TABLE "sponsors" DROP COLUMN "investment_structures"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."sponsors_investment_structures_enum"`
    );
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "exemptions"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_exemptions_enum"`);
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "regulations"`);
    await queryRunner.query(`DROP TYPE "public"."sponsors_regulations_enum"`);
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "hold_period"`);
    await queryRunner.query(`ALTER TABLE "sponsors" ADD "average_irr" numeric`);
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "fees"`);
    await queryRunner.query(`ALTER TABLE "deals" ADD "fees" numeric`);
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "equity_multiple"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "equity_multiple" numeric`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "target_irr"`);
    await queryRunner.query(`ALTER TABLE "deals" ADD "target_irr" numeric`);
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "actual_irr"`);
    await queryRunner.query(`ALTER TABLE "deals" ADD "actual_irr" numeric`);
    await queryRunner.query(
      `ALTER TABLE "sponsors" DROP COLUMN "equity_multiple"`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "equity_multiple" numeric`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sponsors" DROP COLUMN "equity_multiple"`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "equity_multiple" integer`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "actual_irr"`);
    await queryRunner.query(`ALTER TABLE "deals" ADD "actual_irr" integer`);
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "target_irr"`);
    await queryRunner.query(`ALTER TABLE "deals" ADD "target_irr" integer`);
    await queryRunner.query(
      `ALTER TABLE "deals" DROP COLUMN "equity_multiple"`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ADD "equity_multiple" integer`
    );
    await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "fees"`);
    await queryRunner.query(`ALTER TABLE "deals" ADD "fees" integer`);
    await queryRunner.query(`ALTER TABLE "sponsors" DROP COLUMN "average_irr"`);
    await queryRunner.query(`ALTER TABLE "sponsors" ADD "hold_period" integer`);
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_regulations_enum" AS ENUM('A', 'D')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "regulations" "public"."sponsors_regulations_enum" array`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_exemptions_enum" AS ENUM('506B', '506C')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "exemptions" "public"."sponsors_exemptions_enum" array`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_investment_structures_enum" AS ENUM('Debt', 'Equity')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "investment_structures" "public"."sponsors_investment_structures_enum" array`
    );
    await queryRunner.query(`ALTER TABLE "sponsors" ADD "fees" integer`);
    await queryRunner.query(`ALTER TABLE "sponsors" ADD "actual_irr" integer`);
    await queryRunner.query(`ALTER TABLE "sponsors" ADD "target_irr" integer`);
    await queryRunner.query(
      `ALTER TABLE "sponsors" ADD "cash_on_cash" integer`
    );
  }
}
