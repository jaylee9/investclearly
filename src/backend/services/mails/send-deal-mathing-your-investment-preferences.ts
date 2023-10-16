import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import {
  DefaultImages,
  MailConfig,
  TemplatesIds,
} from '../../config/mail-config';
import { DealInterface } from '../deals/interfaces/deal.interface';
import { UserInterface } from '../users/interfaces/user.interface';

export const sendDealMatchedYourInvestmentPreferences = async (
  user: UserInterface,
  deal: DealInterface
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  if (user && deal) {
    const mailData: MailDataRequired = {
      to: { email: user.email },
      from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
      templateId: TemplatesIds.newDealsMatchingYourInvestmentPreferences,
      dynamicTemplateData: {
        frontendUrl: MailConfig.frontendUrl,
        sponsorVanityName: deal?.sponsor?.vanityName || '',
        dealTitle: deal.vanityName,
        dealStateOrCountryDescription:
          deal.locations[0]?.stateOrCountryDescription,
        dealStatus: deal.status,
        dealTargetIRR: deal.targetIRR,
        dealImage: deal.attachments[0]?.path || DefaultImages.dealImage,
      },
    };

    return sgMail.send(mailData);
  }
};
