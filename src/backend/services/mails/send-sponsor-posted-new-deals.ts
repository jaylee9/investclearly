import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import {
  DefaultImages,
  MailConfig,
  TemplatesIds,
} from '../../config/mail-config';
import { DealInterface } from '../deals/interfaces/deal.interface';
import { UserInterface } from '../users/interfaces/user.interface';

export const sendSponsorPostedNewDeals = async (
  user: UserInterface,
  deals: DealInterface[]
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  if (user && deals?.length == 2) {
    let firstDealRegions = '';
    let secondDealRegions = '';

    if (Array.isArray(deals[0].regions) && Array.isArray(deals[1].regions)) {
      firstDealRegions = deals[0]?.regions.join(', ');
      secondDealRegions = deals[1]?.regions.join(', ');
    }

    const mailData: MailDataRequired = {
      to: { email: user.email },
      from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
      templateId: TemplatesIds.sponsorPostedNewDeals,
      dynamicTemplateData: {
        frontendUrl: MailConfig.frontendUrl,
        sponsorVanityName: deals[0].sponsor!.vanityName,
        firstDealTitle: deals[0].vanityName,
        firstDealRegion: firstDealRegions,
        firstDealStatus: deals[0].status,
        firstDealTargetIRR: deals[0].targetIRR,
        firstDealImage: deals[0].attachments[0].path || DefaultImages.dealImage,
        secondDealTitle: deals[1].vanityName,
        secondDealRegion: secondDealRegions,
        secondDealStatus: deals[1].status,
        secondDealTargetIRR: deals[1].targetIRR,
        secondDealImage:
          deals[1].attachments[0].path || DefaultImages.dealImage,
      },
    };

    return sgMail.send(mailData);
  }
};
