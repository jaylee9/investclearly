import { MigrationInterface, QueryRunner } from 'typeorm';
import { LocationTargetTypesConstants } from '../../../backend/constants/location-target-types-constants';
import { SponsorsSeed } from '../../../backend/seeds/sponsors.seed';
import { transformObjectKeysToArrays } from '../../../backend/utils/transform-object-keys-to-arrays';
import { AssetClasses } from '../../../backend/constants/enums/asset-classes';

export class Sh1697216890712 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sponsors = await SponsorsSeed();

    for await (const sponsor of sponsors) {
      let specialties = sponsor.assetClass;

      if (sponsor.assetClass === '') {
        specialties = AssetClasses.other;
      }

      const transformedData = transformObjectKeysToArrays({
        specialties,
      });

      if (transformedData.specialties.length) {
        specialties = transformedData.specialties
          .toString()
          .split(',')
          .map(i => i.trim());
      }

      const sponsorRecord = await queryRunner.query(
        `INSERT INTO "sponsors"
          ("vanity_name", "legal_name", "linked_in_link", "website", "aum", "specialties", "work_for_this_company", "created_at", "updated_at")
         VALUES (
          $1, $2, $3, $4, $5, $6, $7, current_timestamp, current_timestamp
          )
          RETURNING "id"`,
        [
          sponsor.legalName,
          sponsor.legalName,
          sponsor.linkedInPage,
          sponsor.website,
          sponsor.aum || null,
          specialties,
          false,
        ]
      );

      await queryRunner.query(
        `INSERT INTO "locations"
          ("entity_id", "entity_type", "street1", "city",
            "state_or_country", "zip_code",
             "created_at", "updated_at")
          VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, current_timestamp)`,
        [
          sponsorRecord[0].id,
          LocationTargetTypesConstants.sponsor,
          sponsor.streetOrRoad,
          sponsor.city,
          sponsor.state,
          sponsor.zipCode,
        ]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('locations')
      .where('locations.entity_type = :sponsor', {
        sponsor: LocationTargetTypesConstants.sponsor,
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('sponsors')
      .execute();
  }
}
