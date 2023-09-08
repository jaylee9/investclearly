import { MigrationInterface, QueryRunner } from "typeorm";

export class Sh1694175264065 implements MigrationInterface {
    name = 'Sh1694175264065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" ADD "file_date" date`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "submission_type" character varying`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "cik" character varying`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "previous_names" character varying array`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "entity_type" character varying`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "years_of_incorporation" character varying`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "issuer_phone_number" character varying`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "jurisdiction_of_inc" character varying`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "date_of_first_sale" date`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "more_than_one_year" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "deals" ADD "is_deal_published" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "is_deal_published"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "more_than_one_year"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "date_of_first_sale"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "jurisdiction_of_inc"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "issuer_phone_number"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "years_of_incorporation"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "entity_type"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "previous_names"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "cik"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "submission_type"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP COLUMN "file_date"`);
    }

}
