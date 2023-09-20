import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Roles } from '../../constants/enums/roles';
import { loadEnvConfig } from '../../config/load-env-config';

loadEnvConfig();

export class Sh1695214589864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || '',
      10
    );
    await queryRunner.query(
      `INSERT INTO "user"
        ("first_name", "last_name", "email", "email_confirmation_code",
         "password", "profile_picture", "google_id", "address", "total_invested_amount_visibility",
          "your_deals_visibility", "weekly_digest_email", "review_was_published_after_moderation_email",
          "review_was_declined_after_moderation_email", "new_deal_mathing_your_investment_preferences_email",
          "new_deal_from_the_sponsor_you_saved_email", "new_review_has_been_shared_to_sponsor_email", "investor_status",
          "income_and_net_worth", "asset_classes", "regions", "minimum_investment_min", "minimum_investment_max",
          "hold_period_min", "hold_period_max", "role", "created_at", "updated_at")
        VALUES ('Invest', 'Clearly', '${process.env.ADMIN_EMAIL}', NULL, '${hashedPassword}',
          NULL, NULL, NULL, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, NULL, NULL, NULL,
          NULL, NULL, NULL, NULL, NULL, '${Roles.admin}', current_timestamp, current_timestamp)
        RETURNING "id"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE "email" = '${process.env.ADMIN_EMAIL}'`
    );
  }
}
