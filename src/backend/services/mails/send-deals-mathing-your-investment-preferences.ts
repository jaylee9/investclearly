import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import {
  DefaultImages,
  MailConfig,
  TemplatesIds,
} from '../../config/mail-config';
import { DealInterface } from '../deals/interfaces/deal.interface';
import { UserInterface } from '../users/interfaces/user.interface';

export const sendDealsMatchedYourInvestmentPreferences = async (
  user: UserInterface,
  deals: DealInterface[]
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  if (user && deals?.length === 3) {
    let firstDealRegions = '';
    let secondDealRegions = '';
    let thirdDealRegions = '';

    if (
      Array.isArray(deals[0]?.regions) &&
      Array.isArray(deals[1]?.regions) &&
      Array.isArray(deals[2]?.regions)
    ) {
      firstDealRegions = deals[0]?.regions.join(', ');
      secondDealRegions = deals[1]?.regions.join(', ');
      thirdDealRegions = deals[2]?.regions.join(', ');
    }

    const mailData: MailDataRequired = {
      to: { email: user.email },
      from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
      templateId: TemplatesIds.newDealsMatchingYourInvestmentPreferences,
      dynamicTemplateData: {
        frontendUrl: MailConfig.frontendUrl,
        sponsorVanityName: deals[0]?.sponsor!.vanityName || '',
        firstDealTitle: deals[0].vanityName,
        firstDealRegion: firstDealRegions,
        firstDealStatus: deals[0].status,
        firstDealTargetIRR: deals[0].targetIRR,
        firstDealImage:
          deals[0]?.attachments[0].path || DefaultImages.dealImage,
        secondDealTitle: deals[1].vanityName,
        secondDealRegion: secondDealRegions,
        secondDealStatus: deals[1].status,
        secondDealTargetIRR: deals[1].targetIRR,
        secondDealImage:
          deals[1]?.attachments[0].path || DefaultImages.dealImage,
        thirdDealTitle: deals[2].vanityName,
        thirdDealRegion: thirdDealRegions,
        thirdDealStatus: deals[2].status,
        thirdDealTargetIRR: deals[2].targetIRR,
        thirdDealImage:
          deals[2]?.attachments[0].path || DefaultImages.dealImage,
      },
    };

    return sgMail.send(mailData);
  }
};
