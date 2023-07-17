import * as sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';
import { MailConfig, TemplatesIds } from '../../config/mail-config';
import { UserInterface } from '../users/interfaces/user.interface';

export const sendConfirmationEmail = async (
  user: UserInterface,
  dividedConfirmationCodeData: { [key: string]: string }
) => {
  sgMail.setApiKey(MailConfig.sendgridApiKey);

  const { digit1, digit2, digit3, digit4, digit5, digit6 } = dividedConfirmationCodeData;

  const mailData: MailDataRequired = {
    to: user.email,
    from: {
      email: MailConfig.sendFrom,
      name: MailConfig.sendFromName,
    },
    templateId: TemplatesIds.confirmEmail,
    dynamicTemplateData: {
      backendUrl: MailConfig.backendUrl,
      digit1,
      digit2,
      digit3,
      digit4,
      digit5,
      digit6,
    },
  };

  return sgMail.send(mailData);
};
