import { MigrationInterface, QueryRunner } from 'typeorm';
import { LocationTargetTypesConstants } from '../../../backend/constants/location-target-types-constants';

export class Sh1697571196075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "locations"
        SET "state_or_country_description" = UPPER("state_or_country")
        WHERE "entity_type" = $1`,
      [LocationTargetTypesConstants.sponsor]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "locations"
        SET "state_or_country_description" = NULL
        WHERE "entity_type" = $1`,
      [LocationTargetTypesConstants.sponsor]
    );
  }
}
