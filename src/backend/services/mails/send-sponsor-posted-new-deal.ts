import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import {
  DefaultImages,
  MailConfig,
  TemplatesIds,
} from '../../config/mail-config';
import { UserInterface } from '../users/interfaces/user.interface';
import { DealInterface } from '../deals/interfaces/deal.interface';

export const sendSponsorPostedNewDeal = async (
  user: UserInterface,
  deal: DealInterface
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  if (user && deal) {
    const mailData: MailDataRequired = {
      to: { email: user.email },
      from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
      templateId: TemplatesIds.sponsorPostedNewDeals,
      dynamicTemplateData: {
        frontendUrl: MailConfig.frontendUrl,
        sponsorVanityName: deal.sponsor?.vanityName,
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
