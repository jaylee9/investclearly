import { MigrationInterface, QueryRunner } from 'typeorm';
import { SponsorsSeed } from '../../seeds/sponsors.seed';

export class Sh1696328963035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sponsors = await SponsorsSeed();
    for await (const sponsor of sponsors) {
      await queryRunner.query(`INSERT INTO "sponsors"
      ("vanity_name", "legal_name", "user_id", "business_avatar",
       "business_email", "business_phone", "sponsor_name", "address",
        "website", "description", "aum", "specialties", "investment_structures",
        "facebook_link", "linked_in_link", "twitter_link", "instagram_link",
        "exemptions", "work_for_this_company", "regions", "cash_on_cash",
        "equity_multiple", "hold_period", "target_irr", "actual_irr",
        "fees", "regulations", "interests", "year_of_foundation", "created_at", "updated_at")
      VALUES (NULL, '${sponsor.legalName}', NULL, NULL,
       NULL, NULL, NULL, NULL,
        '${sponsor.website}', NULL, '${sponsor.aum}', '${sponsor.assetClass}', NULL,
         NULL, NULL, NULL, NULL, '${sponsor.exemption}', FALSE, NULL, '${sponsor.coc}',
         '${sponsor.equityMultiple}', '${sponsor.holdPeriod}', '${sponsor.irr}', NULL,
         '${sponsor.fees}', NULL, NULL, NULL, "created_at", "updated_at")`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('sponsors')
      .execute();
  }
}
