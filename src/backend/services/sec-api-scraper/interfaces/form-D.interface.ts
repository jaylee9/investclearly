import { SecIndustries } from '../../../constants/enums/sec-industries';
import { CreateLocationInterface } from '../../locations/interfaces/create-location.interface';

export interface FormD {
  id: string;
  accessionNo: string;
  filedAt: Date;
  submissionType: 'D' | 'D/A';
  testOrLive: 'TEST' | 'LIVE';
  primaryIssuer: {
    cik: string;
    entityName: string;
    issuerAddress: CreateLocationInterface;
    issuerPhoneNumber: string;
    jurisdictionOfInc: string;
    issuerPreviousNameList: {
      value: string;
    }[];
    edgarPreviousNameList: {
      value: string;
    }[];
    entityType:
      | 'corporation'
      | 'limited partnership'
      | 'limited liability company'
      | 'general partnership'
      | 'business trust'
      | 'other';
    entityTypeOtherDesc: string;
    yearOfInc: {
      withinFiveYears: boolean;
      yetToBeFormed: boolean;
      overFiveYears: boolean;
      value: string;
    };
  };
  relatedPersonsList: {
    relatedPersonInfo: {
      relatedPersonName: {
        firstName: string;
        middleName: string;
        lastName: string;
      };
      relatedPersonAddress: CreateLocationInterface;
      relatedPersonRelationshipList: {
        relationship: ('Executive Officer' | 'Director' | 'Promoter')[];
      };
      relationshipClarification: string;
    }[];
  };
  offeringData: {
    industryGroup: {
      industryGroupType: SecIndustries;
      investmentFundInfo: {
        investmentFundType:
          | 'Hedge Fund'
          | 'Private Equity Fund'
          | 'Venture Capital Fund'
          | 'Other Investment Fund';
      };
    };
    issuerSize: {
      revenueRange: string;
      aggregateNetAssetValueRange: string;
    };
    federalExemptionsExclusions: {
      item: string[];
    };
    typeOfFiling: {
      newOrAmendment: {
        isAmendment: boolean;
        previousAccessionNumber: string;
      };
      dateOfFirstSale: {
        value: Date;
        yetToOccur: boolean;
      };
    };
    durationOfOffering: {
      moreThanOneYear: boolean;
    };
    typesOfSecuritiesOffered: {
      isEquityType?: boolean;
      isDebtType?: boolean;
      isOptionToAcquireType?: boolean;
      isSecurityToBeAcquiredType?: boolean;
      isPooledInvestmentFundType?: boolean;
      isTenantInCommonType?: boolean;
      isMineralPropertyType?: boolean;
      isOtherType?: boolean;
      descriptionOfOtherType?: string;
    };
    businessCombinationTransaction: {
      isBusinessCombinationTransaction: boolean;
      clarificationOfResponse: string;
    };
    minimumInvestmentAccepted: number;
    salesCompensationList: {
      recipient?: {
        recipientName: string;
        recipientCRDNumber: string;
        associatedBDName: string;
        associatedBDCRDNumber: string;
        recipientAddress: {
          street1: string;
          street2: string;
          city: string;
          stateOrCountry: string;
          stateOrCountryDescription: string;
          zipCode: string;
        };
        statesOfSolicitationList: CreateLocationInterface[];
        over100RecipientFlag: boolean;
      };
    }[];

    offeringSalesAmounts: {
      totalOfferingAmount: number;
      totalAmountSold: number;
      totalRemaining: number;
      clarificationOfResponse?: string;
    };
    investors: {
      hasNonAccreditedInvestors: boolean;
      numberNonAccreditedInvestors?: number;
      totalNumberAlreadyInvested: number;
    };
    salesCommissionsFindersFees: {
      salesCommissions?: {
        dollarAmount: number;
        isEstimate: boolean;
      };
      findersFees?: {
        dollarAmount: number;
        isEstimate: boolean;
      };
      clarificationOfResponse?: string;
    };
    useOfProceeds?: {
      grossProceedsUsed: {
        dollarAmount: number;
        isEstimate: boolean;
      };
      clarificationOfResponse?: string;
    };
  };
  signatureBlock: {
    authorizedRepresentative: boolean;
    signature: {
      issuerName: string;
      signatureName: string;
      nameOfSigner: string;
      signatureTitle: string;
      signatureDate: string;
    };
  };
}
