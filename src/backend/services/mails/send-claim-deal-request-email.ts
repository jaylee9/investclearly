import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import {
  DefaultImages,
  MailConfig,
  TemplatesIds,
} from '../../config/mail-config';
import { DealInterface } from '../deals/interfaces/deal.interface';
import { ClaimedRequests } from '../../entities/claimedRequests.entity';
import { PublicUserInterface } from '../users/interfaces/public-user.interface';

export const sendClaimDealRequestEmail = async (
  user: PublicUserInterface,
  deal: DealInterface,
  claimedRequest: ClaimedRequests
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  const mailData: MailDataRequired = {
    to: { email: MailConfig.supportEmail },
    from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
    templateId: TemplatesIds.claimDeal,
    dynamicTemplateData: {
      frontendUrl: MailConfig.frontendUrl,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      profilePicture: user.profilePicture || DefaultImages.userImage,
      dealId: deal.id,
      dealLegalName: deal.dealLegalName,
      jobTitle: claimedRequest.jobTitle,
      businessEmail: claimedRequest.businessEmail,
      businessPhone: claimedRequest.businessPhone,
      message: claimedRequest.message,
    },
  };

  return sgMail.send(mailData);
};
