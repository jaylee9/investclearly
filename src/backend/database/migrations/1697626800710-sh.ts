import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sh1697626800710 implements MigrationInterface {
  name = 'Sh1697626800710';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."deals_asset_class_enum" RENAME TO "deals_asset_class_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_asset_class_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home', 'Offering Data/Industry Group', 'Pooled Investment Fund', 'Commercial', 'Construction', 'REITs & Finance', 'Residential', 'Other Real Estate', 'Other', 'Lodging & Conventions', 'Affordable Housing', 'Apartments', 'Housing', 'Biotech', 'Healthcare', 'Manufacturing', 'Co Working Space', 'Commercial & Industrial', 'Commercial & Residential', 'Entertainment', 'Hybrid Housing', 'Retail and Office', 'Lending', 'Management', 'Hotels', 'Condominiums', 'Design', 'Development', 'Co-Warehouse', 'Data Centers', 'Farmland', 'Next Generation Enterprise', 'Warehouse', 'Residential land', 'Resorts', 'Senior Living', 'Land', 'Special Purpose', 'Student Housing', 'Office Buildings', 'Life Science', 'Loans', 'Luxury Residence', 'Acquisition', 'Acquisitions', 'Senior housing', 'Manufactured Housing', 'Manufactured Homes', 'Marketing', 'Mobile Home Parks', 'Hotel', 'Hotel Equities', 'Mortgage Notes', 'Venture Debt', 'Renewable Energy', 'Boat', 'RV', 'RV Parks', 'Medical', 'Multi Use', 'Property Management', 'Venues', 'ATM', 'Tech Real Estate', 'Vacation Rental', 'Vacation Rentals', 'Witness Investments', 'Note')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ALTER COLUMN "asset_class" TYPE "public"."deals_asset_class_enum" USING "asset_class"::"text"::"public"."deals_asset_class_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."deals_asset_class_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."sponsors_specialties_enum" RENAME TO "sponsors_specialties_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_specialties_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home', 'Offering Data/Industry Group', 'Pooled Investment Fund', 'Commercial', 'Construction', 'REITs & Finance', 'Residential', 'Other Real Estate', 'Other', 'Lodging & Conventions', 'Affordable Housing', 'Apartments', 'Housing', 'Biotech', 'Healthcare', 'Manufacturing', 'Co Working Space', 'Commercial & Industrial', 'Commercial & Residential', 'Entertainment', 'Hybrid Housing', 'Retail and Office', 'Lending', 'Management', 'Hotels', 'Condominiums', 'Design', 'Development', 'Co-Warehouse', 'Data Centers', 'Farmland', 'Next Generation Enterprise', 'Warehouse', 'Residential land', 'Resorts', 'Senior Living', 'Land', 'Special Purpose', 'Student Housing', 'Office Buildings', 'Life Science', 'Loans', 'Luxury Residence', 'Acquisition', 'Acquisitions', 'Senior housing', 'Manufactured Housing', 'Manufactured Homes', 'Marketing', 'Mobile Home Parks', 'Hotel', 'Hotel Equities', 'Mortgage Notes', 'Venture Debt', 'Renewable Energy', 'Boat', 'RV', 'RV Parks', 'Medical', 'Multi Use', 'Property Management', 'Venues', 'ATM', 'Tech Real Estate', 'Vacation Rental', 'Vacation Rentals', 'Witness Investments', 'Note')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ALTER COLUMN "specialties" TYPE "public"."sponsors_specialties_enum"[] USING "specialties"::"text"::"public"."sponsors_specialties_enum"[]`
    );
    await queryRunner.query(
      `DROP TYPE "public"."sponsors_specialties_enum_old"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."user_asset_classes_enum" RENAME TO "user_asset_classes_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_asset_classes_enum" AS ENUM('Build-to-Rent', 'Co-Living', 'Data Center', 'Flex R&D', 'Flex/Office', 'Hospitality', 'Industrial', 'Land''Manufactured Housing', 'Medical Office', 'Mixed Use', 'Multi-Asset', 'Multifamily', 'Office', 'Parking Garage', 'Retail', 'Senior Housing', 'Single Family', 'Specialty', 'Storage', 'Mobile Home', 'Offering Data/Industry Group', 'Pooled Investment Fund', 'Commercial', 'Construction', 'REITs & Finance', 'Residential', 'Other Real Estate', 'Other', 'Lodging & Conventions', 'Affordable Housing', 'Apartments', 'Housing', 'Biotech', 'Healthcare', 'Manufacturing', 'Co Working Space', 'Commercial & Industrial', 'Commercial & Residential', 'Entertainment', 'Hybrid Housing', 'Retail and Office', 'Lending', 'Management', 'Hotels', 'Condominiums', 'Design', 'Development', 'Co-Warehouse', 'Data Centers', 'Farmland', 'Next Generation Enterprise', 'Warehouse', 'Residential land', 'Resorts', 'Senior Living', 'Land', 'Special Purpose', 'Student Housing', 'Office Buildings', 'Life Science', 'Loans', 'Luxury Residence', 'Acquisition', 'Acquisitions', 'Senior housing', 'Manufactured Housing', 'Manufactured Homes', 'Marketing', 'Mobile Home Parks', 'Hotel', 'Hotel Equities', 'Mortgage Notes', 'Venture Debt', 'Renewable Energy', 'Boat', 'RV', 'RV Parks', 'Medical', 'Multi Use', 'Property Management', 'Venues', 'ATM', 'Tech Real Estate', 'Vacation Rental', 'Vacation Rentals', 'Witness Investments', 'Note')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "asset_classes" TYPE "public"."user_asset_classes_enum"[] USING "asset_classes"::"text"::"public"."user_asset_classes_enum"[]`
    );
    await queryRunner.query(`DROP TYPE "public"."user_asset_classes_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_asset_classes_enum_old" AS ENUM('ATM', 'Acquisition', 'Acquisitions', 'Affordable Housing', 'Apartments', 'Biotech', 'Boat', 'Build-to-Rent', 'Co Working Space', 'Co-Living', 'Co-Warehouse', 'Commercial', 'Commercial & Industrial', 'Commercial & Residential', 'Condominiums', 'Construction', 'Data Center', 'Data Centers', 'Design', 'Development', 'Entertainment', 'Farmland', 'Flex R&D', 'Flex/Office', 'Healthcare', 'Hospitality', 'Hotel', 'Hotel Equities', 'Hotels', 'Housing', 'Hybrid Housing', 'Industrial', 'Land', 'Land''Manufactured Housing', 'Lending', 'Life Science', 'Loans', 'Lodging & Conventions', 'Luxury Residence', 'Management', 'Manufactured Homes', 'Manufactured Housing', 'Manufacturing', 'Marketing', 'Medical', 'Medical Office', 'Mixed Use', 'Mobile Home', 'Mobile Home Parks', 'Mortgage Notes', 'Multi Use', 'Multi-Asset', 'Multifamily', 'Next Generation Enterprise', 'Offering Data/Industry Group', 'Office', 'Office Buildings', 'Other', 'Other Real Estate', 'Parking Garage', 'Pooled Investment Fund', 'Property Management', 'REITs & Finance', 'RV', 'RV Parks', 'Renewable Energy', 'Residential', 'Residential land', 'Resorts', 'Retail', 'Retail and Office', 'Senior Housing', 'Senior Living', 'Senior housing', 'Single Family', 'Special Purpose', 'Specialty', 'Storage', 'Student Housing', 'Tech Real Estate', 'Vacation Rental', 'Vacation Rentals', 'Venture Debt', 'Venues', 'Warehouse', 'Witness Investments')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "asset_classes" TYPE "public"."user_asset_classes_enum_old"[] USING "asset_classes"::"text"::"public"."user_asset_classes_enum_old"[]`
    );
    await queryRunner.query(`DROP TYPE "public"."user_asset_classes_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."user_asset_classes_enum_old" RENAME TO "user_asset_classes_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sponsors_specialties_enum_old" AS ENUM('ATM', 'Acquisition', 'Acquisitions', 'Affordable Housing', 'Apartments', 'Biotech', 'Boat', 'Build-to-Rent', 'Co Working Space', 'Co-Living', 'Co-Warehouse', 'Commercial', 'Commercial & Industrial', 'Commercial & Residential', 'Condominiums', 'Construction', 'Data Center', 'Data Centers', 'Design', 'Development', 'Entertainment', 'Farmland', 'Flex R&D', 'Flex/Office', 'Healthcare', 'Hospitality', 'Hotel', 'Hotel Equities', 'Hotels', 'Housing', 'Hybrid Housing', 'Industrial', 'Land', 'Land''Manufactured Housing', 'Lending', 'Life Science', 'Loans', 'Lodging & Conventions', 'Luxury Residence', 'Management', 'Manufactured Homes', 'Manufactured Housing', 'Manufacturing', 'Marketing', 'Medical', 'Medical Office', 'Mixed Use', 'Mobile Home', 'Mobile Home Parks', 'Mortgage Notes', 'Multi Use', 'Multi-Asset', 'Multifamily', 'Next Generation Enterprise', 'Offering Data/Industry Group', 'Office', 'Office Buildings', 'Other', 'Other Real Estate', 'Parking Garage', 'Pooled Investment Fund', 'Property Management', 'REITs & Finance', 'RV', 'RV Parks', 'Renewable Energy', 'Residential', 'Residential land', 'Resorts', 'Retail', 'Retail and Office', 'Senior Housing', 'Senior Living', 'Senior housing', 'Single Family', 'Special Purpose', 'Specialty', 'Storage', 'Student Housing', 'Tech Real Estate', 'Vacation Rental', 'Vacation Rentals', 'Venture Debt', 'Venues', 'Warehouse', 'Witness Investments')`
    );
    await queryRunner.query(
      `ALTER TABLE "sponsors" ALTER COLUMN "specialties" TYPE "public"."sponsors_specialties_enum_old"[] USING "specialties"::"text"::"public"."sponsors_specialties_enum_old"[]`
    );
    await queryRunner.query(`DROP TYPE "public"."sponsors_specialties_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."sponsors_specialties_enum_old" RENAME TO "sponsors_specialties_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."deals_asset_class_enum_old" AS ENUM('ATM', 'Acquisition', 'Acquisitions', 'Affordable Housing', 'Apartments', 'Biotech', 'Boat', 'Build-to-Rent', 'Co Working Space', 'Co-Living', 'Co-Warehouse', 'Commercial', 'Commercial & Industrial', 'Commercial & Residential', 'Condominiums', 'Construction', 'Data Center', 'Data Centers', 'Design', 'Development', 'Entertainment', 'Farmland', 'Flex R&D', 'Flex/Office', 'Healthcare', 'Hospitality', 'Hotel', 'Hotel Equities', 'Hotels', 'Housing', 'Hybrid Housing', 'Industrial', 'Land', 'Land''Manufactured Housing', 'Lending', 'Life Science', 'Loans', 'Lodging & Conventions', 'Luxury Residence', 'Management', 'Manufactured Homes', 'Manufactured Housing', 'Manufacturing', 'Marketing', 'Medical', 'Medical Office', 'Mixed Use', 'Mobile Home', 'Mobile Home Parks', 'Mortgage Notes', 'Multi Use', 'Multi-Asset', 'Multifamily', 'Next Generation Enterprise', 'Offering Data/Industry Group', 'Office', 'Office Buildings', 'Other', 'Other Real Estate', 'Parking Garage', 'Pooled Investment Fund', 'Property Management', 'REITs & Finance', 'RV', 'RV Parks', 'Renewable Energy', 'Residential', 'Residential land', 'Resorts', 'Retail', 'Retail and Office', 'Senior Housing', 'Senior Living', 'Senior housing', 'Single Family', 'Special Purpose', 'Specialty', 'Storage', 'Student Housing', 'Tech Real Estate', 'Vacation Rental', 'Vacation Rentals', 'Venture Debt', 'Venues', 'Warehouse', 'Witness Investments')`
    );
    await queryRunner.query(
      `ALTER TABLE "deals" ALTER COLUMN "asset_class" TYPE "public"."deals_asset_class_enum_old" USING "asset_class"::"text"::"public"."deals_asset_class_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."deals_asset_class_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."deals_asset_class_enum_old" RENAME TO "deals_asset_class_enum"`
    );
  }
}
