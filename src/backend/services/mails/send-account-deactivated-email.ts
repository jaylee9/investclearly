import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import {
  DefaultImages,
  MailConfig,
  TemplatesIds,
} from '../../config/mail-config';
import { PublicUserInterface } from '../users/interfaces/public-user.interface';

export const sendAccountDeactivatedEmail = async (
  user: PublicUserInterface,
  deactivationReason: string
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  const mailData: MailDataRequired = {
    to: { email: MailConfig.supportEmail },
    from: { email: MailConfig.sendFrom, name: MailConfig.sendFromName },
    templateId: TemplatesIds.accountDeactivated,
    dynamicTemplateData: {
      userFirstName: user.firstName,
      userLastName: user.lastName,
      profilePicture: user.profilePicture || DefaultImages.userImage,
      message: deactivationReason,
    },
  };

  return sgMail.send(mailData);
};
