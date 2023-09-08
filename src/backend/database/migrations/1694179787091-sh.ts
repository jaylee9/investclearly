import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1694179787091 implements MigrationInterface {
  name = 'Sh1694179787091';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "deal_related_persons" ("related_person_id" integer NOT NULL, "deal_id" integer NOT NULL, CONSTRAINT "PK_bea9cde4a5cfd4ef8d36b24b61a" PRIMARY KEY ("related_person_id", "deal_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e15940108c5226843367da8b78" ON "deal_related_persons" ("related_person_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_de6fbd06e4e7a51953aecc543d" ON "deal_related_persons" ("deal_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "deal_related_persons" ADD CONSTRAINT "FK_e15940108c5226843367da8b78c" FOREIGN KEY ("related_person_id") REFERENCES "related_persons"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "deal_related_persons" ADD CONSTRAINT "FK_de6fbd06e4e7a51953aecc543d1" FOREIGN KEY ("deal_id") REFERENCES "deals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deal_related_persons" DROP CONSTRAINT "FK_de6fbd06e4e7a51953aecc543d1"`
    );
    await queryRunner.query(
      `ALTER TABLE "deal_related_persons" DROP CONSTRAINT "FK_e15940108c5226843367da8b78c"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_de6fbd06e4e7a51953aecc543d"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e15940108c5226843367da8b78"`
    );
    await queryRunner.query(`DROP TABLE "deal_related_persons"`);
  }
}
