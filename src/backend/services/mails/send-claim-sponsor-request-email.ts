import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import {
  DefaultImages,
  MailConfig,
  TemplatesIds,
} from '../../config/mail-config';
import { ClaimedRequests } from '../../entities/claimedRequests.entity';
import { PublicUserInterface } from '../users/interfaces/public-user.interface';
import { SponsorInterface } from '../sponsors/interfaces/sponsor.interface';

export const sendClaimSponsorRequestEmail = async (
  user: PublicUserInterface,
  sponsor: SponsorInterface,
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
      sponsorLegalName: sponsor.legalName,
      jobTitle: claimedRequest.jobTitle,
      businessEmail: claimedRequest.businessEmail,
      businessPhone: claimedRequest.businessPhone,
      message: claimedRequest.message,
    },
  };

  return sgMail.send(mailData);
};
