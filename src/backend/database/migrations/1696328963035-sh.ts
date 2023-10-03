import { MigrationInterface, QueryRunner } from 'typeorm';
import { SponsorsSeed } from '../../seeds/sponsors.seed';
import { LocationTargetTypesConstants } from '../../constants/location-target-types-constants';

export class Sh1696328963035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sponsors = await SponsorsSeed();
    for await (const sponsor of sponsors) {
      const sponsorRecord = await queryRunner.query(`INSERT INTO "sponsors"
      ("vanity_name", "legal_name", "user_id", "business_avatar",
       "business_email", "business_phone", "sponsor_name", "address",
        "website", "description", "aum", "specialties", "investment_structures",
        "facebook_link", "linked_in_link", "twitter_link", "instagram_link",
        "exemptions", "work_for_this_company", "regions", "cash_on_cash",
        "equity_multiple", "hold_period", "target_irr", "actual_irr",
        "fees", "regulations", "interests", "year_of_foundation", "created_at", "updated_at")
      VALUES (NULL, '${sponsor.legalName}', NULL, NULL,
        NULL, NULL, NULL, NULL, '${sponsor.website}', NULL, '${sponsor.aum}', '${sponsor.assetClass}', NULL,
        NULL, NULL, NULL, NULL, '${sponsor.exemption}', FALSE, NULL, '${sponsor.coc}',
        '${sponsor.equityMultiple}', '${sponsor.holdPeriod}', '${sponsor.irr}', NULL,
        '${sponsor.fees}', NULL, NULL, NULL, current_timestamp, current_timestamp)
      RETURNING "id"`);

      await queryRunner.query(`INSERT INTO "locations"
      ("entity_id", "entity_type", "street1", "street2", "city",
       "state_or_country", "state_or_country_description", "zip_code",
        "created_at", "updated_at")
      VALUES (${sponsorRecord[0].id}, '${LocationTargetTypesConstants.sponsor}', '${sponsor.streetOrRoad}', NULL, '${sponsor.city}',
       '${sponsor.state}', NULL, '${sponsor.zipCode}',
        current_timestamp, current_timestamp)
      )
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('locations')
      .where('locations.entityType = :sponsor', {
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
