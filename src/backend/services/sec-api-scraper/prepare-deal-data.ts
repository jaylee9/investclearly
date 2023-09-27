import moment from 'moment';
import { InvestmentStructures } from '../../constants/enums/investment-structures';
import { Exemptions } from '../../constants/enums/exemptions';
import { DealStatuses } from '../../constants/enums/deal-statuses';
import { AssetClasses } from '../../constants/enums/asset-classes';
import { Regulations } from '../../constants/enums/regulations';
import { FormD } from './interfaces/form-D.interface';
import { MomentConstants } from '../../constants/moment-constants';
import { Regions } from '../../../backend/constants/enums/regions';

interface IssuerData {
  previousName?: string[];
  value?: string;
}

export const prepareDealData = async (offering: FormD) => {
  const expirationDateFor500C = moment()
    .subtract(6, 'months')
    .subtract(1, 'days')
    .format(MomentConstants.yearMonthDay);

  const expirationDateFor500B = moment()
    .subtract(12, 'months')
    .subtract(1, 'days')
    .format(MomentConstants.yearMonthDay);

  const fifteenDaysOlderDate = moment()
    .subtract(15, 'days')
    .format(MomentConstants.yearMonthDay);

  const fourteenDaysOlderDate = moment()
    .subtract(14, 'days')
    .format(MomentConstants.yearMonthDay);

  const is06c =
    offering?.offeringData?.federalExemptionsExclusions?.item?.includes('06c');
  const is06b =
    offering?.offeringData?.federalExemptionsExclusions?.item?.includes('06b');

  let investmentStructures = InvestmentStructures.equity;
  let exemption = Exemptions.Rule506C;
  let status = DealStatuses.open;
  let isDealPublished = false;

  if (offering?.offeringData?.typesOfSecuritiesOffered?.isDebtType) {
    investmentStructures = InvestmentStructures.debt;
  }

  if (is06c) {
    if (moment(offering?.filedAt) < moment(expirationDateFor500C)) {
      status = DealStatuses.closedActive;
    } else if (
      moment(offering?.filedAt) >= moment(expirationDateFor500C) &&
      moment(offering?.filedAt) <= moment(fifteenDaysOlderDate)
    ) {
      status = DealStatuses.open;
    } else {
      isDealPublished =
        moment(offering?.filedAt) >= moment(fourteenDaysOlderDate);
    }
  } else if (is06b) {
    exemption = Exemptions.Rule506B;

    if (moment(offering?.filedAt) < moment(expirationDateFor500B)) {
      status = DealStatuses.closedActive;
      isDealPublished = true;
    }
  }

  if (
    exemption === Exemptions.Rule506C ||
    (exemption === Exemptions.Rule506B && status === DealStatuses.closedActive)
  ) {
    let allPreviousNames: string[] = [];
    if (offering?.primaryIssuer?.issuerPreviousNameList?.length) {
      allPreviousNames =
        offering?.primaryIssuer?.issuerPreviousNameList?.reduce(
          (acc: string[], item: IssuerData) => {
            if (item.previousName && Array.isArray(item.previousName)) {
              acc = acc.concat(item.previousName);
            }
            return acc;
          },
          []
        );
    }

    return {
      secApiId: offering?.id,
      assetClass: AssetClasses.offeringDataOrIndustryGroup,
      dealTitle: offering?.primaryIssuer?.entityName,
      minimumInvestment: offering?.offeringData?.minimumInvestmentAccepted,
      investmentStructures,
      targetRaise:
        offering?.offeringData?.offeringSalesAmounts?.totalOfferingAmount,
      dealLegalName: offering?.primaryIssuer?.entityName,
      exemption,
      secIndustry: offering?.offeringData?.industryGroup?.industryGroupType,
      regulation: Regulations.d,
      status,
      street1: offering?.primaryIssuer?.issuerAddress?.street1,
      street2: offering?.primaryIssuer?.issuerAddress?.street2,
      city: offering?.primaryIssuer?.issuerAddress?.city,
      stateOrCountry: offering?.primaryIssuer?.issuerAddress?.stateOrCountry,
      stateOrCountryDescription:
        offering?.primaryIssuer?.issuerAddress?.stateOrCountryDescription,
      zipCode: offering?.primaryIssuer?.issuerAddress?.zipCode,
      accessionNumber: offering?.accessionNo,
      fileDate: offering?.filedAt,
      cik: offering?.primaryIssuer?.cik,
      previousNames: allPreviousNames,
      entityType: offering?.primaryIssuer?.entityType,
      yearsOfIncorporation: offering?.primaryIssuer?.yearOfInc?.value,
      issuerPhoneNumber: offering?.primaryIssuer?.issuerPhoneNumber,
      jurisdictionOfInc: offering?.primaryIssuer?.jurisdictionOfInc,
      dateOfFirstSale:
        offering?.offeringData?.typeOfFiling?.dateOfFirstSale?.value,
      isMoreThanOneYear:
        offering?.offeringData?.durationOfOffering?.moreThanOneYear,
      submissionType: offering.submissionType,
      regions: Regions.myState,
      dealAddress: '',
      description: '',
      cashOnCash: 0,
      fees: 0,
      equityMultiple: 0,
      holdPeriod: 0,
      targetIRR: 0,
      actualIRR: 0,
      preferredReturn: 0,
      dealSponsor: '',
      closeDate: offering?.filedAt,
      attachmentsIdsToDelete: [],
      isDealPublished: isDealPublished,
    };
  }

  return null;
};
