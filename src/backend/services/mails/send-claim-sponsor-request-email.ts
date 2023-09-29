import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import {
  DefaultImages,
  MailConfig,
  TemplatesIds,
} from '../../config/mail-config';
import { ClaimedRequests } from '../../entities/claimedRequests.entity';
import { DealInterface } from '../deals/interfaces/deal.interface';
import { PublicUserInterface } from '../users/interfaces/public-user.interface';

export const sendClaimSponsorRequestEmail = async (
  user: PublicUserInterface,
  deal: DealInterface,
  claimedRequest: ClaimedRequests
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  const mailData: MailDataRequired = {
    to: { email: MailConfig.supportEmail },
    from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
    templateId: TemplatesIds.claimSponsor,
    dynamicTemplateData: {
      userFirstName: user.firstName,
      userLastName: user.lastName,
      profilePicture: user.profilePicture || DefaultImages.userImage,
      dealLegalName: deal.dealLegalName,
      jobTitle: claimedRequest.jobTitle,
      businessEmail: claimedRequest.businessEmail,
      businessPhone: claimedRequest.businessPhone,
      message: claimedRequest.message,
    },
  };

  return sgMail.send(mailData);
};
